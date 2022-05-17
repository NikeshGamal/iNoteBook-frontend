import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {
  //Use of the useState hook should be inside a component if it is placed inside handleSubmit then it will show an error as handleSubmit is not a component of the React or function used in useState hook
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
      e.preventDefault();
      const {name,email,password,cpassword}=credentials;

      //to check and let the credential to be entered iff cpassword and password are matched
      if(password===cpassword){
          //hitting the api-->endpoints
          const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
           method: 'POST', 
           headers: {
             'Content-Type': 'application/json'
            },
           body: JSON.stringify({name,email,password}) 
         });
         const json= await response.json();
         console.log(json);
         
         if(json.success){
             //save the token and refirect
             localStorage.setItem('token',json.authtoken);
              //for redirecting we use --------useHistory hook in react-router-5 but after react-router 6 we use navigate hook to redirect--------- hook 
              props.showAlert("Account is created successfully","success");
             navigate("/"); 
         }
      }else{
           props.showAlert("Enter valid credentials","danger");  
           setCredentials({name:"",email:"",password:"",cpassword:""})
      }
          
  }

  const onChange = (e)=>{
    //With every change on the values of the element we see the changes over the value
    setCredentials({...credentials,[e.target.name]:e.target.value});
}
  return (
    <div className='container'>
       <form onSubmit={handleSubmit}>
       <div className="mb-3">
             <label htmlFor="name" className="form-label">Enter name</label>
             <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={credentials.name} onChange={onChange}/>
             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
           </div>
           <div className="mb-3">
             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
             <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
           </div>
           <div className="mb-3">
             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
             <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required/>
           </div>
           <div className="mb-3">
             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
             <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required/>
           </div>
           <button type="submit" className="btn btn-primary">Submit</button>
       </form>
    </div>
  )
}

export default Signup