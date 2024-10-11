import React, { useEffect, useState } from 'react';
import './Profile.css';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const [name, setName] = useState('');
  const [mailid, setMailid] = useState('');
  const [orders, setOrders] = useState([]);

  // Fetch orders based on email
  const fetchOrders = async (email) => {
    try {
      const response = await fetch(`https://foodil.onrender.com/listfood?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Decode token and set user info
    const token = localStorage.getItem('token');
    if (token) {
      const decodedData = jwtDecode(token);
      setName(decodedData.name);
      setMailid(decodedData.email);
      fetchOrders(decodedData.email);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPercentage = 10;
      const scrollY = window.scrollY;
      const totalPageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollY / totalPageHeight) * 100;

      const profilePage = document.querySelector('.profile-page');
      const userInfo = document.getElementById('userinfo');
      const ordersDiv = document.getElementById('orders');

      if (scrollPercentage >= triggerPercentage) {
        profilePage.style.position = 'fixed';
        profilePage.style.top = '0';
        profilePage.style.zIndex = '5';

        userInfo.style.position = 'fixed';
        userInfo.style.top = '0';
        userInfo.style.backdropFilter = 'blur(10px)';
        userInfo.style.boxShadow = '0px 0px 4px black';
        document.getElementById('userinfo').style.marginTop='0%';

        ordersDiv.style.position = 'fixed';
        ordersDiv.style.top = '10%';
        ordersDiv.style.left = '0';
        ordersDiv.style.width = '100%';
        ordersDiv.style.height = '80%';
      } else {
        profilePage.style.position = 'absolute';
        profilePage.style.top = '0%';
        profilePage.style.zIndex = '1';
     


        userInfo.style.position = 'absolute';
        userInfo.style.top = '2.8%';
       
        userInfo.style.boxShadow = 'none';

        ordersDiv.style.position = 'absolute';
        ordersDiv.style.top = '4%';
        ordersDiv.style.left = '10%';
        ordersDiv.style.width = '75%';
        ordersDiv.style.height = '72%';
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the scroll event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(()=>{
    const ordersDiv = document.getElementById('orders');
    const profilePage = document.querySelector('.profile-page');

    const handleOrdersScroll = () => {
      const scrollTop = ordersDiv.scrollTop;
      const scrollHeight = ordersDiv.scrollHeight - ordersDiv.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      // Check if orders scroll percentage is 10% or more
      if (scrollPercentage >= 10) {
        // Scroll profile page to 10% of its total scrollable height
        const profilePageHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: profilePageHeight * 0.105,
          behavior: 'smooth', // Smooth scrolling
        });
      }
    };

    // Add the scroll event listener to #orders
    ordersDiv.addEventListener('scroll', handleOrdersScroll);

    // Cleanup on component unmount
    return () => {
      ordersDiv.removeEventListener('scroll', handleOrdersScroll);
    };
  })

  return (
    <div className="profile-page">
      <div id="userinfo">
        <h1>{name}</h1>
        <p>{mailid}</p>
      </div>
      <div id="orders">
        <div id="ordersinfo">
          <p>Past Orders</p>
          {orders &&
            orders.map((order, index) => (
              <div key={index} id="orderscontainer" >
                 
                <div className="cart-items">
                <span id='date' >Date&nbsp;:&nbsp;{order.current_date}</span>
                  {Object.entries(order.cart).map(([itemId, itemDetails], itemIndex) => (
                    <div key={itemIndex} className="cart-item">
                      <img src={itemDetails.item_img} alt={itemDetails.name} />
                      <p id="itemname" >{itemDetails.name}</p>
                      <p id="quantity">{itemDetails.name}&nbsp;X&nbsp;{itemDetails.quantity}</p>
                      <p id="price" >Price&nbsp;:&nbsp;&#8377;{itemDetails.price}</p>
                      <div id='line'></div>
                    
                    </div>
                  ))}
                  <p id='totalpaid'>Amount&nbsp;Paid&nbsp;:&nbsp;{order.Amount_Paid}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
