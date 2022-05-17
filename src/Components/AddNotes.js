import React from 'react';
import {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

export const AddNotes = (props) => {
    const context= useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tags:""});
    const onSubmit = (e)=>{
        //e.preventDefault() in order to prevent from reloading the pages
        e.preventDefault();
        //addNote method receives 3 parameters that will add the respective note 
         addNote(note.title,note.description,note.tags);
         setNote({title:"",description:"",tags:""});
         props.showAlert("Added a note","success");  
    }

    const onChange = (e)=>{
        //With every change on the values of the element we see the changes over the value
        setNote({...note,[e.target.name]:[e.target.value][0]});
    }

  return (
   <div className="container">
        <div className='container my-4'>
        <h1>Add a Note</h1>
         <form>
             <div className="form-group">
                 <label htmlFor="title">Your Title</label>
                 <input type="text" className="form-control my-2" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" minLength={5} onChange={onChange} value={note.title}/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control my-2" id="description" name="description" placeholder="Description" minLength={5} onChange={onChange} value={note.description}/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Tags</label>
                  <input type="text" className="form-control my-2" id="tags" name="tags" placeholder="Tags" onChange={onChange} value={note.tags}/>
             </div>

            <button disabled={note.title.length<5 || note.description.length<5 ?true:false} type="submit" className="btn btn-primary  my-2" onClick={onSubmit}>Add a note</button>
         </form>
       </div>
   </div>
  )
}

export default AddNotes;