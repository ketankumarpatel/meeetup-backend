'use strict'

var express = require('express')
var taskRoutes = express.Router()
const task = require('../models/task')
// get all task items in the db
taskRoutes.route('/all').get(function (req, res, next) {
  task.find(function (err, tasks) {
    if (err) {
      return next(new Error(err))
    }

    let returnObj = {
       totalTasks:[]
     }
     returnObj.totalTasks = tasks
     res.status(200).send(returnObj)
  })
})

// add a task item
taskRoutes.route('/add').post(function (req, res) {
  task.create(
    {
      taskName: req.body.taskName,
      isDone: false
    },
    function (error, task) {
      if (error) {
        res.status(400).send('Unable to create task list')
      } 
      // Id of the Created object is Appended and returned

      // task = { _id: _id , taskName: taskName, isDone: isDone }
      res.status(200).json(task)
    }
  )
})

// delete a task item


// Route Params
taskRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id

  task.findByIdAndRemove(id, function (err, task) {                // Wrapper methods of mongoose
    if (err) {
      return next(new Error('task was not found'))
    }
    res.json('Successfully removed')
  })
})

// Query Params

taskRoutes.route('/update').post(function (req, res, next) {
  var id = req.query.id
  console.log('id is ' + id)
  task.findById(id, function (error, foundTask) {
    if (error) {
      return next(new Error('task was not found'))
    } else {

      foundTask.isDone = req.query.isDone // Changing document state and udpating
      foundTask.save({
        function (error, task) {
          if (error) {
            res.status(400).send('Unable to update task')
          } else {
            res.status(200).json(task)
          }
        }
      })
    }
  })
})

module.exports = taskRoutes