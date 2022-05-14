import {useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';

export const Note = () => {
  const context= useContext(noteContext);
  const {notes,getNotes} = context;
      useEffect(() => {
       getNotes();
      }, [])
  return (
       <>
       <AddNotes/>
        <div className="row my-2">
         <h1 className='my-4'>Your Notes</h1>
              {
                // .map() function requires a callback function where we pass note as a argument
                //.map() will call the callback function for each element in the notes
                notes.map((note)=>{
                   return  <NoteItem key={note._id} note={note}/>
                })
              }
        </div>
       </>
       
  )
}

export default Note;