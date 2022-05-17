import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'


const Login = (props) => {
  //Use of the useState hook should be inside a component if it is placed inside handleSubmit then it will show an error as handleSubmit is not a component of the React or function used in useState hook
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
      e.preventDefault();
      //hitting the api-->endpoints
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({email:credentials.email,password:credentials.password}) 
      });
      const json= await response.json();
      console.log(json);


      if(json.success){
        props.showAlert("Successfully login","success");
          //save the token and refirect
          localStorage.setItem('token',json.authtoken);
           //for redirecting we use --------useHistory hook in reac-router-5 but after react-router 6 we use navigate hook to redirect--------- hook 
          navigate("/");
      }else{
        props.showAlert("Enter valid credentials","danger");  
        setCredentials({email:"",password:""})
      }
  }

  const onChange = (e)=>{
    //With every change on the values of the element we see the changes over the value
    setCredentials({...credentials,[e.target.name]:e.target.value});
}
  return (
    <div className='container my-4 my-4 my-4 my-4' >
      <div className="container " style={{width:"640px"}}>
          <h1 className='text-center text-primary'>Login</h1>
           <form onSubmit={handleSubmit}>
               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" style={{fontSize:"22px"}} className="form-label">Email address</label>
                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
                 <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
               </div>
               <div className="mb-3">
                 <label htmlFor="exampleInputPassword1" style={{fontSize:"22px"}} className="form-label">Password</label>
                 <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
               </div>
               <button type="submit" className="btn btn-primary" style={{fontSize:"17px"}}>Submit</button>
           </form>
      </div>
    </div>
  )
}

export default Login