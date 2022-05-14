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
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2E5ZmU0ZGE2ZjM1YWE1Yzc2YjYzMyIsImlhdCI6MTY1MjI0MDEwMX0.p7ESFzFgUguwJ0DjHbhHpFgA74lpEraZ6UQB9cw2y38"
          },
          body: JSON.stringify() 
        });
        // console.log({title,description,tags});
        const data=await response.json();
        setNotes(data);
      }



        //We are creating some functinos to carry CRUD operation
        //1.ADD a note
        const addNote= async(title,description,tags)=>{
          //TODO: API  call
           //TODO : API Calls
          
           const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2E5ZmU0ZGE2ZjM1YWE1Yzc2YjYzMyIsImlhdCI6MTY1MjI0MDEwMX0.p7ESFzFgUguwJ0DjHbhHpFgA74lpEraZ6UQB9cw2y38"
            },
            body: JSON.stringify({title,description,tags}) 
          });
          // console.log({title,description,tags});
          const json=await response.json();
          console.log(json);
        }

        //2.Delete a note
          const deleteNote= async(id)=>{
            //TODO: API  call
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2E5ZmU0ZGE2ZjM1YWE1Yzc2YjYzMyIsImlhdCI6MTY1MjI0MDEwMX0.p7ESFzFgUguwJ0DjHbhHpFgA74lpEraZ6UQB9cw2y38"
              }
            });
            const json=await response.json();
            console.log(json);

          //.filter()--> this method is used to filter the content according to the given condition
          // Here the note whose id is not equal to the id passed to be deleted is return in order to form a newNote and the id that is we passed remains left
          //--->>>> filtered or left out
            // const newNotes = notes.filter((notes)=>{return notes._id !== id});
            // setNotes(newNotes);
       }
      
        //3.Edit a note
       const editNote = async (id,title,description,tags)=>{
          //TODO : API Calls
          
          const response = await fetch(`${host}/api/notes/update/627b4dfd5ae8b3b507aa7d8c`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2E5ZmU0ZGE2ZjM1YWE1Yzc2YjYzMyIsImlhdCI6MTY1MjI0MDEwMX0.p7ESFzFgUguwJ0DjHbhHpFgA74lpEraZ6UQB9cw2y38"
            },
            body: JSON.stringify({title,description,tags}) 
          });

          const json=await response.json();
          console.log(json);
          //logic to edit the notes  
         for (let index = 0; index < notes.length; index++) {
           const element = notes[index];
           if(element._id===id){
             element.title=title;
             element.description=description;
             element.tags=tags;
           }
         }
       }


  

     return(
          //In order to provide the states values we use Provider Component but need not to use Consumer Components after the introduction of useContext hook in React 
          <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
               {props.children}
          </NoteContext.Provider>
     )
}

export default NoteState;