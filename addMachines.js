const mongoose = require('mongoose');

// Replace <db_password> with the actual password for your MongoDB database
mongoose.connect('mongodb+srv://kv36639:WFYomBjMXObx1uEe@cluster0.wrphg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

const machineSchema = new mongoose.Schema({
    machineId: String,
    status: { type: String, default: 'Unused' },
});

const Machine = mongoose.model('Machine', machineSchema);

const initializeMachines = async () => {
    await Machine.insertMany([
        { machineId: 'machine1' },
        { machineId: 'machine2' },
        { machineId: 'machine3' },
    ]);
    console.log('Machines initialized');
    mongoose.disconnect();
};

initializeMachines();
