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
        setNote({...note,[e.target.name]:[e.target.value][0]});
    }

  return (
    <div>
        <h1>Add a Note</h1>
         <form>
             <div className="form-group">
                 <label htmlFor="title">Your Title</label>
                 <input type="text" className="form-control my-2" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control my-2" id="description" name="description" placeholder="Description" onChange={onChange}/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Tags</label>
                  <input type="text" className="form-control my-2" id="tags" name="tags" placeholder="Tags" onChange={onChange}/>
             </div>

            <button type="submit" className="btn btn-primary  my-2" onClick={onSubmit}>Add a note</button>
         </form>
    </div>
  )
}

export default AddNotes;