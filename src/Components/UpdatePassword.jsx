import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdatePassword.css'

const UpdatePassword =()=>{
  const navigate=useNavigate();
    const [pass,setpass]=useState("");
    const[confirmpass,setconfirmpass]=useState("");
    const location=useLocation();
    const { email } = location.state || {}; 
   
      
    
    

    const handlePassword1Change=(e)=>{
        setpass(e.target.value);

    }
    const handlePassword2Change=(e)=>{
        setconfirmpass(e.target.value);
    }
   
    const UpdatePassword=async()=>{
        const user_data={
            email:email,
            newPassword :pass,
        }
        try {
            const response = await fetch('https://foodil.onrender.com/update-password', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user_data)
            });
            const data = await response.json();
            console.log(data.message);
          
          
            //logic for appending multiple json objects
            
           
         } catch (error) {
            console.error('Error fetching location:', error);
          }
        

    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
     

     
        if(confirmpass===pass){
             document.getElementById('error').innerText='Password reset Success'
             document.getElementById('error').backgroundColor='green';
             document.getElementById('error').style.display='block';
             await UpdatePassword();
             navigate('/login')
            
             
         
            
             
        }
        else{
            document.getElementById('error').innerText='Password and Confirm Password should be same'
            document.getElementById('error').backgroundColor='lightred';
            document.getElementById('error').style.display='block';
            

        }

   setTimeout(()=>{

   
    document.getElementById('error').style.display='none';

},3000)
    }

    return(
        <>
         <div id='newpasscontainer'>
         <form onSubmit={handleSubmit}>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" >New Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e)=>handlePassword1Change(e)}/>
  </div>
  
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e)=>handlePassword2Change(e)}/>
  </div>
  
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
  <div id='error' style={{display:'none'}} ></div>
</form>
         </div>
        </>
    )
}
export default UpdatePassword;