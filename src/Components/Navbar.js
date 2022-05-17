import React from 'react'
import { Link , useLocation} from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

export const Navbar = (props) => {
   let navigate = useNavigate();
    let location = useLocation();

    const handleLogout = ()=>{
       localStorage.removeItem('token');
       props.showAlert("Successfully Logout","success");
       navigate('/login');
    }
  return (  
    <>
        <nav className=" px-4 navbar navbar-expand-lg navbar-dark bg-dark">
           <Link className="navbar-brand" to="/">iNoteBook</Link>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
                   
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${location.pathname==="/"?"active":" "}`}>
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className={`nav-item ${location.pathname==="/about"?"active":" "}`}>
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
              {!localStorage.getItem('token') ?<div className="container d-flex justify-content-end">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
              </div>: <div className="container d-flex justify-content-end">
              <button onClick={handleLogout} className="btn btn-primary float-right" to="/logout" role="button">Logout</button>
              </div>}
            </div>
       </nav>
    </>
  )
}

export default Navbar