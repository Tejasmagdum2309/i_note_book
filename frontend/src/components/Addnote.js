import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../contexts/noteContext'

export default function Addnote(props) {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        // To prevent relding after adding note....
        e.preventDefault()
        addNote(note.title,note.tag,note.description);
        setnote({ title: "", description: "", tag: "" })
        props.showAlert("Added Succesfully","success")
        
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-3">
            <h2>Add a Note :</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}  minLength={5}  />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
