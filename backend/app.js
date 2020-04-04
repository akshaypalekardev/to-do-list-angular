const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./models/task');

const app = express();

mongoose.connect('mongodb+srv://Akshay:7WGEv9JdK48ZILhp@akshay-dev-cluster-e7fsj.mongodb.net/todoapp-database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELETE, OPTIONS')
  next();
});

app.get('/api/tasks', (req, res, next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched successfully',
      tasks: documents
    });
  });
});

app.post('/api/tasks', (req, res, next) => {
  const task = new Task({
    todo: req.body.todo
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdTask._id
    })
  });
});

app.delete('/api/tasks/:id', (req, res, next) => {
  Task.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({
      message: 'Post Deleted'
    });
  });
});

module.exports = app;
