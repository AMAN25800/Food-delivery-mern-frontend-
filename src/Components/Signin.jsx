import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Fix the import
import { Link } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(0);
  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setValue({ ...value, [name]: val });
  };

  const adduser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Capture the time when request starts
    const startTime = performance.now();

    try {
      const response = await fetch('https://foodil-n60i.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      const data = await response.json();

      if (data.success) {
        // Measure how long the response took
        const endTime = performance.now();
        console.log(`Login API response time: ${endTime - startTime} milliseconds`);

        // Save the token in localStorage
        localStorage.setItem("token", data.token);

        // Decode the token to get user info
        const decodedToken = jwtDecode(data.token);
        console.log("User info from token:", decodedToken); // For debugging

        setMessage("Login Successful");

        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else {
        console.log(data.message);
        setMessage(data.message);
      }

    } catch (error) {
      console.log("An error occurred:", error);
      setMessage("An error occurred. Please try again.");
    }

    setIsLoading(false);
    setClicked(1);
  };

  setTimeout(() => {
    if (clicked === 1) {
      setClicked(0);
    }
  }, 3000);

  return (
    <>
   
    <div className='signupform' style={{ backgroundColor: '#ffedeb' }}>
       
      <div id='message' className='container' style={{ display: clicked ? 'block' : 'none' }}>
        {message}
        <img src='https://cdn-icons-png.freepik.com/256/5610/5610944.png?ga=GA1.1.1962969448.1717676862&semt=ais_hybrid'
          style={{ display: clicked && message === "Login Successful" ? 'block' : 'none', marginTop: '-9%' }}
          height={"30px"}
        />
      </div>
      <div className="form-container">
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" onChange={onChangeHandler} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" onChange={onChangeHandler} required />

          <button type="submit" onClick={adduser}>
           LOGIN
          </button>
          <Link id='forgotpass'  style={{fontWeight:'600',marginLeft:'60%',marginTop:'5%',textDecoration:'none',color:'black'}} to='/verify'>Forgot Password?</Link>
          <div id='newuser' style={{marginTop:'5%'}}>New User? <Link style={{textDecoration:'none',color:'red',fontSize:'18px'}} to='/signup'>Signup</Link></div>
        </form>
      </div>
    
    </div>
    
    </>
    
  );
};

export default Signin;
