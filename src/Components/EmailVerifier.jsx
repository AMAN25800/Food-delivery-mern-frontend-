import React from 'react'
import './EmailVerifier.css';
import Signin from './Signin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState,useRef } from 'react';
const EmailVerifier=()=>{
    const navigate=useNavigate();
    var mail='';
    
    const [formData, setFormData] = useState({
     
        email: '',
        message: 'Hello Welcome to FoodPoint We Hope you are Fine\n\n Your OTP for resetting password is\n\n'
    });
    const [serverotp,setserverotp]=useState(0);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const [closer,setcloser]=useState(false);
  
    const handleChangeOtp = (element, index) => {
      const value = element.value;
      if (value.match(/^[0-9]*$/)) {  // Ensure only numbers are allowed
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
  
        // Move to the next input if a value is entered
        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    };
  
    const handleKeyDown = (event, index) => {
      if (event.key === 'Backspace' && index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://foodil.onrender.com/send-email', formData);
            if (response.data.status.substring(0,7) === 'success') {
                const num=parseInt(response.data.status.substring(7));
                setserverotp(num);
            }
        } catch (error) {
            console.error('Error sending email', error);
            alert('Failed to send email');
        }
    };
    const number = parseInt(otp.join(''), 10)//logic for converting array into number;
    
const handleOtp=(event)=>{
    event.preventDefault();
if(serverotp===number){
   
    navigate('/updatepass',{state:{email:formData.email}});
}
}

    return(
        <>
        <div id='signinpage'><Signin></Signin></div>

        <div className='email-verifier'>
        <button id='closebtn' onClick={()=>navigate('/login')}>ESC</button>
        
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={formData.email} onChange={(e)=>handleChange(e)}/>

  </div>

  <button type="submit" class="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
  <span id='otptext'>Enter Otp</span>
  <div style={{ display: 'flex', justifyContent: 'center' }} id='otpbox'>
  {otp.map((data, index) => (
    <input
      key={index}
      type="text"
      value={data}
      maxLength="1"
      onChange={(e) => handleChangeOtp(e.target, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      ref={(el) => (inputRefs.current[index] = el)}
      className="otp-input"  // Add this class to each OTP input
    />
  ))}
</div>


</form>
<button type='otpsubmit' className='btn btn' style={{width:'50%'}} onClick={handleOtp}>Submit</button>

        </div>
        </>
    )
}
export default EmailVerifier;
