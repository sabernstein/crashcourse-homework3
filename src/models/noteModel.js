import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({

  title : {type: String, required: true},
  body: {type: String},
  createdAT: {type: Date, default: Date.now}

});


const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
