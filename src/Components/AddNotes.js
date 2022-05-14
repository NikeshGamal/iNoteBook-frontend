import React from 'react';
import {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

export const AddNotes = () => {
    const context= useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tags:"Default"});
    const onSubmit = (e)=>{
        //e.preventDefault() in order to prevent from reloading the pages
        e.preventDefault();
        //addNote method receives 3 parameters that will add the respective note 
         addNote(note.title,note.description,note.tags);
    }

    const onChange = (e)=>{
        //With every change on the values of the element we see the changes over the value
        setNote({...note,[e.target.name]:[e.target.value]});
    }

  return (
    <div>
        <h1>Add a Note</h1>
         <form>
             <div className="form-group">
                 <label htmlFor="title">Email address</label>
                 <input type="text" className="form-control my-2" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Password</label>
                  <input type="text" className="form-control my-2" id="description" name="description" placeholder="Password" onChange={onChange}/>
             </div>
             <div className="form-check my-2">
                 <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                 <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
             </div>
            <button type="submit" className="btn btn-primary  my-2" onClick={onSubmit}>Add a note</button>
         </form>
    </div>
  )
}

export default AddNotes;