const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kv36639:WFYomBjMXObx1uEe@cluster0.wrphg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Connected to MongoDB')).catch((err) => console.error(err));

const machineSchema = new mongoose.Schema({
    machineId: String,
    status: { type: String, default: 'Unused' },
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = {
    Machine
}