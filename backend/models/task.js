const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  todo: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
