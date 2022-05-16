import {useContext,useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate} from 'react-router-dom';

export const Note = () => {
  let navigate = useNavigate();

  const context= useContext(noteContext);
  const {notes,getNotes,editNote} = context;
      useEffect(() => {
        if(localStorage.getItem('token')){
          getNotes();
        }else{
          navigate("/login");
        }
      }, [])

      const [note, setNote] = useState({etitle:"",edescription:"",etags:""});

      const ref = useRef(null);        
      const updateNote = (currentNote)=>{
          ref.current.click();
          setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etags:currentNote.tags});
      }

      const onSubmit = (e)=>{
        console.log("Loading updating note:",note);
        //e.preventDefault() in order to prevent from reloading the pages
        e.preventDefault();

        //editNote function takes 4 arguments but since edit takes recent entries or changes so we pass etitle,edescription and etags
        editNote(note.id,note.etitle,note.edescription,note.etags);
        
    }

    const onChange = (e)=>{
        //With every change on the values of the element we see the changes over the value
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
       <>
       <AddNotes/>

       <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Launch demo modal
       </button>
       

       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div className="modal-body">
                   <form>
                       <div className="form-group">
                           <label htmlFor="etitle">Your Title</label>
                           <input type="text" className="form-control my-2" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
                       </div>
                       <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control my-2" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                       </div>
                       <div className="form-group">
                            <label htmlFor="description">Tags</label>
                            <input type="text" className="form-control my-2" id="etags" name="etags" onChange={onChange} value={note.etags}/>
                       </div>
          
                      <button type="submit" className="btn btn-primary  my-2" onClick={onSubmit}>Update Note</button>
                </form>
             </div>
           </div>
          </div>
         </div>
        <div className="row my-2">
         <h1 className='my-4'>Your Notes</h1>
              {
                // .map() function requires a callback function where we pass note as a argument
                //.map() will call the callback function for each element in the notes
                notes.map((note)=>{
                   return  <NoteItem key={note._id} updateNote={updateNote} note={note}/>
                })
              }
        </div>
       </>
       
  )
}

export default Note;