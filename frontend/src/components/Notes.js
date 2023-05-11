import React from 'react'
import { useContext, useRef, useState } from 'react'

import NoteItem from './NoteItem'
import Addnote from './Addnote'
import noteContext from '../contexts/noteContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Notes(props) {
  
  const context = useContext(noteContext)
  let navigate = useNavigate()
  const { notes, getNote ,editNote } = context;



  useEffect(() => {
    if(localStorage.getItem('token')){
        
       getNote() 
    }else{
     navigate("/login")
    }
    
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentnote) => {
    ref.current.click()
    setnote({id:currentnote._id , etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    
  }

  const handleClick = (e) => {
    
    // console.log("updatiingggg");
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    props.showAlert("updated successfully" , "success")

  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }



  return (
    <>
      <Addnote showAlert={props.showAlert} />
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Note :</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}  minLength={3}  />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h2>Your Notes :</h2>
        <div className="container">
        {notes.length===0 && "Add some notes "}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div></>
  )
}
