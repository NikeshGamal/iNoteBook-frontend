import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
     const host="http://localhost:5000";
     const noteInitial=[];
      //here we are using useState hook inside to intialize the notes and update the notes
     const [notes, setNotes] = useState(noteInitial);


      //1.GET/Fetch all note
      const getNotes= async()=>{
        //TODO: API  call
         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify() 
        });
        // console.log({title,description,tags});
        const json=await response.json();
         setNotes(json);
      }



        //We are creating some functinos to carry CRUD operation
        //1.ADD a note
        const addNote= async(title,description,tags)=>{
          //TODO: API  call
          
           const response = await fetch(`${host}/api/notes/addnote`, {
            mode: 'cors',
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tags})
          }).catch((err) => {
            console.log("inside catch");
            if(typeof err === 'string') err = new Error(err)
            console.error(err)
          })
          // console.log({title,description,tags});
          const json= await response.json();
          console.log(json);
          setNotes(notes.concat(json));
        }

        //2.Delete a note
          const deleteNote= async(id)=>{
            //TODO: API  call
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                  "auth-token":localStorage.getItem('token')
              }
            });
            const json=await response.json();
            console.log(json);

          //.filter()--> this method is used to filter the content according to the given condition
          // Here the note whose id is not equal to the id passed to be deleted is return in order to form a newNote and the id that is we passed remains left
          //--->>>> filtered or left out
            const newNotes = notes.filter((notes)=>{return notes._id !== id});
            setNotes(newNotes);
            props.showAlert("Deleted note","success"); 
       }
      
        //3.Edit a note
       const editNote = async (id,title,description,tags)=>{
          //TODO : API Calls
          const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tags}) 
          });

          const json=await response.json();
          console.log(json);

          //In react we can't change the state directly so we need to make a newaNode and change it
          //it forms the deep copy
          let newNotes=JSON.parse(JSON.stringify(notes));

          //logic to edit the notes  
         for (let index = 0; index < notes.length; index++) {
           const element = newNotes[index];
           if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tags=tags;
            break;
           }
         }
         setNotes(newNotes);
       }


  

     return(
          //In order to provide the states values we use Provider Component but need not to use Consumer Components after the introduction of useContext hook in React 
          <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,}}>
               {props.children}
          </NoteContext.Provider>
     )
}

export default NoteState;