const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const machineSchema = new mongoose.Schema({
    machineId: String,
    status: { type: String, default: 'Unused' },
});

const Machine = mongoose.model('Machine', machineSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kv36639:WFYomBjMXObx1uEe@cluster0.wrphg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));


app.get('/machines', async (req, res) => {
    const machines = await Machine.find();
    res.json({
        machines : machines.map((machine)=>({
            machineId: machine.machineId,
            status: machine.status,
        }))
    });
});

app.put('/update', async (req, res) => {
    const { machineId, status } = req.body;

    if (!machineId || !status) {
        return res.status(400).json({ message: 'Machine ID and status are required' });
    }

    try {
        const machine = await Machine.findOneAndUpdate(
            { machineId },
            { status },
            { new: true } // Returns the updated document
        );

        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }

        // Emit the updated status via WebSocket
        io.emit('statusUpdated', { machineId: machine.machineId, status: machine.status });

        res.json({ message: 'Machine status updated successfully', machine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('updateStatus', async ({ machineId, status }) => {
        await Machine.findOneAndUpdate({ machineId }, { status });
        io.emit('statusUpdated', { machineId, status });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));