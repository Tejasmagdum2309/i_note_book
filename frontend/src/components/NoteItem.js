import React from 'react'
import noteContext from '../contexts/noteContext'
import { useContext } from 'react';

export default function NoteItem(prpos) {
    const context = useContext(noteContext)
    const { delNote } = context;
    const { note,updateNote } = prpos;
    
    
    return (
        

        <div className="col-md-3">
            <div className="card my-3 " >
                <div className="card-body">
                    <h5 className="card-title ">{note.title}</h5>
                    {/* < div className="d-flex align-items-center"></div> 
                                        new  */                               }
                    <h6 className="card-description mb-2 text-body-secondary">{note.description}</h6>
                    <p className="card-text"> {note.tag}</p>
                    <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNote(note); }} ></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{delNote(note._id); prpos.showAlert("Deleted successfully" , "success")}}></i>
                </div>
            </div>
        </div>
    )
}
