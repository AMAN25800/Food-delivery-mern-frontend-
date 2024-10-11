import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // To decode the token
import Main from './Main';
import './Protected.css';
import Slider from './Slider';
import Navbar from './Navbar';

const Protected = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); // Set the user data from the decoded token
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle invalid token case
      } finally {
        setLoading(false); // Set loading to false once we check the token
      }
    } else {
      // No token found, end loading
      setLoading(false);
    }
  }, []);

  return (
    <div className='userpage' >
      {/* Conditionally render the Navbar only after loading */}
    
        
          <div className='usernavbar'>
            <Navbar loggedin={user} />
           
          </div>
         
          {user && (
            <div className='user'>
              <p >{user.name.indexOf(' ')!=-1?user.name.substring(0,user.name.indexOf(' ')):user.name.substring(0)}</p>
              
            </div>
          ) 
        }
        
   
    </div>
  );
};

export default Protected;
