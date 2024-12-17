import React, { useContext, useEffect, useState } from 'react';
import './CartContainer.css';
import { CartContext } from './CartContext';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';


const CartContainer = () => {

  
 

  const userAddressData=[];
  const[defaultAddress,setdefaultAddress]=useState("");
  const [newaddressclicked,setnewaddressclicked]=useState(false);
  const [clicked,setclicked]=useState(false);
  const[payment,setpayment]=useState(false);
  const [Number,setNumber]=useState("");
  const [userAddress,setuserAddress]=useState([]);
  const { cart, setCart } = useContext(CartContext);  // Destructure setCart
  const [loader,setloader]=useState(false);
  const [addresscontainer,setaddresscontainer]=useState(false);
  const [phoneno,setphoneno]=useState(false);
  const[userdata,setuserdata]=useState([]);
  
  let totalprice=0;
  const navigate=useNavigate();
  const fetchAddress = async () => {
    const token = localStorage.getItem('token');
    if(token){
    const decodedtoken = jwtDecode(token);
    const mailid = decodedtoken.email;
  
    
    const email = { mail: mailid };

    try {
      const response = await fetch('https://foodil-n60i.onrender.com/getusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
      });
      const data = await response.json();
      const arrData=Object.values(data);
      
      if (data.length>=1 ) {
      
        setuserAddress((prevUserAddress) => ({
          ...prevUserAddress,
          ...arrData, // Merge new data with existing state
        }));
     
       
       
      }
      
      //logic for appending multiple json objects
      
     
   } catch (error) {
      console.error('Error fetching location:', error);
    }
  }
  
 
  };
  

  useEffect(() => {
    fetchAddress();
  }, []);
 
  // Function to increment the quantity of an item
  const handleIncrement = (index) => {
    const updatedCart = cart.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);  // Call setCart to update the state
  };

  // Function to decrement the quantity of an item
  const handleDecrement = (index) => {
    const updatedCart = cart.map((item, idx) => {
      if (index === idx && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);  // Call setCart to update the state
  };

  // Function to remove an item from the cart
  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, idx) => idx !== index); // Remove the item at the clicked index
    setCart(updatedCart);  // Call setCart to update the state
  };
const handleAddressSelector=(e)=>{
  const defaultData=e.target.innerText;
  setdefaultAddress(defaultData);
  
  const val=e.target.innerText;

  const parentDiv = e.target.closest('.useraddressbtn');
  
  // Remove any previously appended images from all divs
  const allDivs = document.querySelectorAll('.useraddressbtn img');
  allDivs.forEach((img) => img.remove());
  
  // Create an image element
  const img = document.createElement('img');
  img.src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png?ga=GA1.1.1962969448.1717676862&semt=ais_hybrid';
  img.alt = 'Appended Image';
  
  img.style.height = '30px';
  img.style.width='30px';
  
  img.style.marginTop='-30px'
  img.style.marginLeft='90%';
  
  // Append the image to the clicked div
  parentDiv.appendChild(img);
  setloader(true);
  setTimeout(()=>{
  setloader(false);
  },2000)

  

}

const length=Object.keys(userAddress).length;
for(let i=0;i<length;i++){
  userAddressData.push(userAddress[i].address);
}

const handleNumber=(e)=>{
  const phone=e.target.value;
  setNumber(phone);

}
 console.log(defaultAddress);

 const handleSubmit=(e)=>{
  if(Number!=''){
    setloader(true);
    setclicked(true);
    setTimeout(()=>{
      setloader(false);
    },2000);



  }
 

 }


const redirectToOrderPayment=async(event)=>{
  event.preventDefault();
 if(cart.length>0){
 
  const token=localStorage.getItem('token');
  const userinfo=jwtDecode(token);
  const user_mail=userinfo.email;
  const user_name=userinfo.name;
  const current_date=new Date();
  const formattedDate = current_date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const userData = {
    customer_email:user_mail,
    customer_name:user_name,
    customer_phone: Number,
    customer_address:defaultAddress,
    Amount_Paid:totalprice,
    cart: cart,
    current_date:formattedDate, // Array of items
  };
  console.log(cart);
  try {
    const response = await fetch('https://foodil-n60i.onrender.com/addfood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log('added order:', data.message);
  } catch (error) {
    console.error('Error saving location:', error);
  }
  setCart([]);
  setpayment(true);
  setTimeout(()=>{
   
    window.location.href="/";
  },2500)

}

}
const ManageNewaddress=()=>{
  setnewaddressclicked(true);


}
const getAddress=(data)=>{
  setdefaultAddress(data);

}
console.log(Number);

  return (
    <>
   <div id='callnav' > <Navbar newaddress={newaddressclicked} setnewaddress={setnewaddressclicked} setDefaultAddress={getAddress}></Navbar></div>
      <div id="cartdata" style={{ backgroundColor: cart.length > 0 ? '#DCDCDC' : 'white' }}>
        <div id='successmessage' style={{display:payment?'block':'none'}}>Order Placed Successfully</div>
        {cart.length === 0 ? (
          <div id="cartempty">
            <img
              src="https://img.freepik.com/free-vector/girl-pushing-shopping-cart-with-groceries_1308-42627.jpg?ga=GA1.1.1962969448.1717676862&semt=ais_hybrid"
             
              style={{textDecoration:'none'}}
            />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div id="cartitems">
            <div id="cartcontainer">
              <div>
                {cart.map((item, index) => (
                  
                 <div id='cart'>
                    <img src={item.item_img} alt={item.name} />
                    <p>{item.name} - {item.quantity} x &#8377;{item.price}</p>
                    <div id="totalprice" style={{fontWeight:'500',fontSize:'17px'}}>&#8377;{parseInt(item.quantity * item.price)}</div>
                    <div id="addbtn">
                      <button id="decrementer" onClick={() => handleDecrement(index)} style={{border:'none',color:'red',fontWeight:'bold',fontSize:'30px',backgroundColor:'transparent'}}>-</button>
                      <span style={{marginLeft:'15px',fontSize:'20px',fontWeight:'500'}}>{item.quantity}</span>
                      <button id="incrementer" onClick={() => handleIncrement(index)} style={{border:'none',color:'green',fontWeight:'bold',fontSize:'30px',backgroundColor:'transparent',marginLeft:'10px'}}>+</button>
                      <Link id='removebtn' onClick={() => handleRemove(index)}>
                        <img src='https://cdn-icons-png.flaticon.com/128/6861/6861362.png' alt="remove"/>
                      </Link>
                    </div>
                    <div id="underline"></div>
                    
                    </div>
                 
                ))}
              
              </div>
              {
                cart.map((item,index)=>{
                  totalprice+=item.price*item.quantity;
               
                })
              }
            
           
            
            </div>
            <div id='total'><p>TO PAY:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; &#8377;{totalprice}</p></div>
           
            <div id='locationimg'><img src='https://cdn-icons-png.flaticon.com/128/535/535188.png' height={"40px"}/></div>
            jsx
Copy code
<button id='userdatacontainer' onClick={() => setaddresscontainer(!addresscontainer)}>
  <p>Choose a delivery address</p>

  {userAddressData.map((item, index) => {
    if (!addresscontainer) {
      return (
        <button
          key={index}
          id='userdatabtn'
          onClick={handleAddressSelector}
          className='useraddressbtn'
        >
          <h5>{item.substring(0, 4).toUpperCase()}</h5>
          <p>{item.substring(item.indexOf(',') + 1)}</p>
        </button>
      );
    }
  })}

  <div id='addressdatadiv' style={{display:defaultAddress!=''?'none':'block'}}>
    <button
      id='AddNewAddressData'
      className='btn btn-secondary'
      onClick={ManageNewaddress}
    >
      Add new address
    </button>
  </div>

  <span id='addresstext' style={{ display: addresscontainer ? 'block' : 'none' }}>
    {defaultAddress}
  </span>
</button>
            <span id='phoneimg' style={{display:addresscontainer?'block':'none'}}><img src='https://cdn-icons-png.flaticon.com/128/455/455705.png' /></span>
            <button id='phone' style={{display:addresscontainer?'block':'none'}} onClick={()=>setphoneno(!phoneno)}>
              <p>Phone Number</p>
              
  <input type="text" class="form-control" placeholder="+91" aria-label="code"  id='code'/>

  <input type="number" class="form-control" placeholder="Phone Number" aria-label="phone"  onChange={(e)=>handleNumber(e)} id='number'/>
  <button class='btn btn' style={{height:'40px',marginLeft:'10px',width:'150px',padding:'5px'} } onClick={handleSubmit}>Submit</button>
</button>
<span id='paymenticon' style={{display:clicked?'block':'none'}}><img src='https://cdn.iconscout.com/icon/free/png-512/free-payment-icon-download-in-svg-png-gif-file-formats--method-money-finance-transaction-e-commerce-and-shopping-pack-icons-1644360.png?f=webp&w=256' /></span>
<div id='paymentmethod' style={{display:clicked?'block':'none'}}>
  <p>Choose a payment method</p>
  
  <button id='paymentbtn'  onClick={redirectToOrderPayment}>PROCEED TO PAY</button>
</div>
   
          </div>
        )}
        <div id='loaderdiv' style={{display:loader?'block':'none'}}>
          <div id='loadercontent'><span className='loader'></span><p style={{color:'white',fontSize:'20px'}}>Updating Cart</p></div>
          
        </div>
      </div>
    </>
  );
};

export default CartContainer;
