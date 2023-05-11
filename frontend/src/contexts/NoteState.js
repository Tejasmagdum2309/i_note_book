import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

    // get all notes note
    const getNote = async () => {
      //Api call :
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      //
      const json = await response.json();
      // console.log(json);
      setNotes(json);
    }

  // add note
  const addNote = async (title, description, tag) => {
    //Api call :
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json()
    setNotes(notes.concat(note))
    
    
    
  }

  //delete a note

  const delNote = async (id) => {
    //Api call :
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)

    // console.log("Deleted id : " + id)
    let newNote = notes.filter((note) => note._id !== id);
    // console.log(newNote)
    setNotes(newNote)
  }

  //edit note

  const editNote = async (id, title, description, tag) => {
    //Api call :
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json)
    //To display on front end
    let newNote = JSON.parse(JSON.stringify(notes))
    
    for (let index = 0; index < newNote.length; index++) {
      const note = newNote[index];
      if (note._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      } 
    }
    setNotes(newNote)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, delNote, editNote , getNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;