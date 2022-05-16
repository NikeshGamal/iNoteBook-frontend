import './App.css';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from './context/notes/NotesState';
import Alert from "./Components/Alert";
import Signup from './Components/Signup';
import Login from './Components/Login';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <>
    {/* Inorder to use context API  we need to wrap all the component inside the NoteState so that all the component can use all the states that are wrapped inside NoteState Component*/}
    <NoteState>
       <Router>
             <Navbar/>
             <Alert/>
             <div className="container">
               {/* Before Router 6, we used <Swicth> inorder to pass the different route but after Router 6 we don't need to use Switch but we use Routes */}
               {/* Also we pass the Components inside element and use exact*/}
                  <Routes>
                       <Route exact path="/"  element={<Home/>}/>   
                       <Route exact path="/about"  element={<About/>}/>  
                       <Route exact path="/login"  element={<Login/>}/>  
                       <Route exact path="/signup"  element={<Signup/>}/>    
                  </Routes>
             </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
