import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

export const NoteItem = (props) => {
  const context= useContext(noteContext);
  const {deleteNote} = context;

    const {note,updateNote} = props;
  return (
      <div className='col-md-3'>
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                </div>

                <div className="container my-2">
                  {/* deleteNote takes id as an argument as it need to rightly loacate and delete the particular note when we click on that delete button of that particular note */}
                   <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                   <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
      </div>
  )
}

export default NoteItem;