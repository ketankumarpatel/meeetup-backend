
const mongoose = require('mongoose');

const Schema = mongoose.Schema; // on the Properties of Mongoose


// Define collection and schema for todo Item

// database - > Tables - > Rows
// database -> Collections --> documents

var task = new Schema({
  taskName: {
    type: String
  },
  isDone: {
    type: Boolean
  }
}, {collection: 'tasks'})





module.exports = mongoose.model('task', task);  // first Arg is Collection Name