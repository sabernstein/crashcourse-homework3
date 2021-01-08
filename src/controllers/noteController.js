import Note from "../models/noteModel"


/*This is a generic function I have to reply to unauthorized requests */
exports.wrongRoute = async (req, res) => {
    return res.status(405).json({general : "method not allowed" })
}

/*This is the function that is supposed to return all the notes*/
exports.getNotes = async (req, res) => {
  try {
        const notes = await Note.find //pauses until a "promise" is either fulfilled or rejected
        return res.status(200).json(notes) //200 corresponds to all the notes; .json is a text-based data format - exists as a string
    } catch (err) {
        return res.status(500).json({ //500 corresponds to error code
            error: err.message
        })
    }
}

/*returns one note given the noteId  else return error message in the catch block */
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
        return res.status(404).json({general: "Note not found"}) //404 fail
    }else {
        return res.status(200).json(note) //200 success
    }

  } catch (err) {
      return res.status(500).json({ //500 error
          error: err.message
        })
      }

}

/*This is the function that adds an article*/
exports.addNote = async (req, res) => {
  try {
    const newNote = await Note.create(valuesInput(req.body));
    return res.status(201).json({ //201 note created and saved
        status: "success",
        article: newNote
    })

  } catch (err) {
      return res.status(500).json({
          error: err.message
    })
  }

}

/* Finds the given note and updates it. returns the updated note */
exports.updateNote = async (req, res) => {
  try{
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
      })

      if (!updatedNote) {
          return res.status(404).json({general: "Note not found"}) //404 not found
      }else {
          return res.status(200).json(updatedNote) //200 note updated and saved
      }
  }catch(err){
      return res.status(403).json({error: err.message})
  }
}

}

/* Finds the given noteId and deletes it */
exports.deleteNote = async (req, res) => {
  try{
        const deletedNote  = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) {
            return res.status(404).json({general: "Note not found"}) //404 not found
        }else {
            return res.status(200).json({general: "Note deleted successfully"}) //200 deleted
        }
    }catch(err){
        return res.status(500).json({error: err.message}) //500 error
    }
}
