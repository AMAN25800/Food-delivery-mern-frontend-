import react, { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

import './Signup.css';

const Signup=()=>{
  const navigate=useNavigate();
  const [currState,setCurrState]=useState("Login");
  const[ResponseMessage,setResponseMessage]=useState('');
  const[message,setmessage]=useState("");

  const [clicked,setclicked]=useState(0);
  const [value,setvalue]=useState({
    name:"",
    email:"",
    password:"",

  })

  const onChangeHandler=(e)=>{
       const name=e.target.name;
       const val=e.target.value;
       
      
      setvalue({...value,[name]:val});
  }
   const adduser=async (e)=>{
    e.preventDefault();
    /*
    this is for sending the request to the database and fetching the response from 
    there and storing or getting the response
    */
    try {
      const response = await fetch('https://foodil.onrender.com/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
       
      });

      const data = await response.json();

      if (data.success) {
        // Save the token in localStorage
    
        localStorage.setItem("token", data.token);
       

        // Optionally, you can store user info if needed
     

        const decodedToken = jwtDecode(data.token);
        console.log("User info from token:", decodedToken); // For your reference

        setmessage("Signup Successful")


        // Redirect to a protected page or update the state
      setTimeout(()=>{

      
        navigate('/login');
      },2000)
        
        // Redirect or update the state as needed
      } else {
       console.log(data.message);
       setmessage(data.message);
     
      }
    } catch (error) {
      console.log("An error occurred. Please try again.");
      setmessage("An error occurred");
     
    }
    setclicked(1);
   /*
     this is for only sending the response
     const adduser=async()=>{
       await addUser(value)//from  ../service/api
      }
  */
       
     
    
   

  };

setTimeout(()=>{
  if(clicked==1){
    setclicked(0);
  }
},3000);

    return(
        <div className='signupform' style={{backgroundColor:'#ffedeb'}}>
           <div id='message'  class='container' style={{display:clicked?'block':'none'}}>{message}</div>
      
         
        <div className="form-container">
          
       
    <form>
    <label for="name" style={{marginLeft:'-1rem'}}>Name:</label>
      <input type="name" id="name" name="name" placeholder="Enter your name"  onChange={(e)=>onChangeHandler(e)} required/>

   
      <label for="email" style={{marginLeft:'-1rem'}}>Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email"  onChange={(e)=>onChangeHandler(e)} required/>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>onChangeHandler(e)} required/>

      <button type="submit" onClick={adduser}>SIGNUP</button>
      <div id='already-exist'>Already Exists?<Link to='/login' style={{textDecoration:'none',color:'red',marginLeft:'20px',fontWeight:'bold'}}>LOGIN </Link></div>
      </form>
     
      

      </div>
      
      </div>
      
    )
    }
export default Signup;