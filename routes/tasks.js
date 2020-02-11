const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

//@route    GET /api/tasks
//@desc     Get all tasks
//@access   Public
router.get('/', async (req, res) => {
  try {
    await Task.find({}, function(err, tasks) {
      if (err) {
        console.log('something went wrong');
        next();
      }
      res.json(tasks);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST /api/tasks
//@desc     Add a task
//@access   Public
router.post(
  '/',
  [
    check('name', 'Please enter a task name')
      .not()
      .isEmpty(),
    check('description', 'Please eneter a description')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    try {
      const newTask = new Task({
        name,
        description
      });
      const task = await newTask.save();
      res.json(task);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    PUT /api/tasks/:id
//@desc     Update task
//@access   Public
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;

  const taskFields = {};
  if (name) taskFields.name = name;
  if (description) taskFields.description = description;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    DELETE /api/tasks/:id
//@desc     Delete task
//@access   Public
router.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
