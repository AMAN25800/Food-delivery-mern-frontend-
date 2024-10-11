import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const LiveLocation = ({ clicked }) => {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const HERE_API_KEY = 'kH6u_5JiXKebqQAe2cJxcCZSqY8fdztAa18Maynkx4o'; // Replace with your HERE API key

  const getLocation = () => {
    if (navigator.geolocation) {
      setMessage('Locating...');

      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use HERE API to get the address
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apikey=${HERE_API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.items && data.items.length > 0) {
          const addressComponents = data.items[0].address; // Get address components
          const fullAddress = `${addressComponents.street} ${addressComponents.houseNumber}, ${addressComponents.city}, ${addressComponents.state}, ${addressComponents.postalCode}`;
          setLocation(fullAddress);
          setMessage('');
        } else {
          setMessage('No address found for the location.');
        }
      })
      .catch(error => {
       
        setLocation(`Unable to retrieve address. Error: ${error.message}`);
      });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setMessage('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setMessage('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setMessage('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setMessage('An unknown error occurred.');
        break;
      default:
        setMessage('An unknown error occurred.');
    }
  };

  useEffect(() => {
    getLocation();
    localStorage.setItem('location',location);
  }, );

  return (
    <div style={{ margin: '0px', fontFamily: 'Arial, sans-serif' }}>
 
    </div>
  );
};

export default LiveLocation;
