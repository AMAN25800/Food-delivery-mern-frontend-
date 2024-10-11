import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import LiveLocation from './LiveLocation';
import {BeatLoader} from 'react-spinners';
import { useContext } from 'react';

const Navbar = ({ loggedin,userdata,newaddress,setnewaddress,setDefaultAddress}) => {

  const [islogged, setisloggged] = useState(false);
  const [block, setblock] = useState(false); // Toggles the profile expander
  const [data, setdata] = useState(false);
  const[locationclicked,setlocationclicked]=useState(false);
  const[livelocation,setlivelocation]=useState(false);
  const [address,setaddress]=useState("");
  const [loading,setloading]=useState(false);
  const[disabled,setdisabled]=useState(false);
  const [blocks, setBlocks] = useState([]); // Store all dynamic blocks
  const[completeaddress,setcompleteaddress]=useState({email:'',address:''});
  const [distinct,setdistict]=useState(false);
  const  [userData,setuserData]=useState([])
  const[userAddress,setuserAddress]=useState([]);
  const[currentAddress,setcurrentAddress]=useState("");
  const [inputaddress,setinputaddress]=useState({
    flatNo:'',
    landmark:'',
    pincode:'',
    addressType:'home',
  });

const addressArr=[]
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if(token){
    const decodedtoken = jwtDecode(token);
    const mailid = decodedtoken.email;
  
    
    const email = { mail: mailid };

    try {
      const response = await fetch('https://foodil.onrender.com/getusers', {
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
        setcurrentAddress(arrData[arrData.length-1].address);
       
       
      }
      
      //logic for appending multiple json objects
      
     
   } catch (error) {
      console.error('Error fetching location:', error);
    }
  }
  };
 
  useEffect(() => {
   
  
    fetchData();
  }, []);


  

  // Add a new block to the state
  const addressSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decodedtoken = jwtDecode(token);
    const mailid = decodedtoken.email;

    // Combine the address fields into a complete address
    const fullAddress = distinct
      ? `${inputaddress.addressType},${inputaddress.flatNo}, ${inputaddress.landmark}, ${inputaddress.pincode}`
      : `${inputaddress.addressType},${address}, ${inputaddress.flatNo}, ${inputaddress.landmark}, ${inputaddress.pincode}`;
const finaladdress={
  email:mailid,
  address:fullAddress,
}
    setcompleteaddress(finaladdress);

    // Send the address to the backend
    try {
      const response = await fetch('https://foodil.onrender.com/savelocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finaladdress)
      });
      const data = await response.json();
      console.log('Location saved:', data.message);
    } catch (error) {
      console.error('Error saving location:', error);
    }
    fetchData();
    setcurrentAddress(finaladdress.address);
    setlocationclicked(false);
    setlivelocation(false);
    document.getElementById('address').style.display="none";
    setdisabled(false);
  
  };



  const navigate = useNavigate();


  useEffect(() => {
    if (loggedin) {
      const navbar = document.getElementById("navbarSupportedContent");
      const bsCollapse = new window.bootstrap.Collapse(navbar);
      bsCollapse.show(); // Expand the navbar when logged in
      document.getElementById('toggler').style.display = "none";
    }
  }, [loggedin]);

  const dataHandler = () => {
    const navbar = document.getElementById("navbarSupportedContent");

    if (navbar) {
      const bsCollapse = new window.bootstrap.Collapse(navbar);
      if (data) {
        bsCollapse.hide(); // Collapse the navbar
      } else {
        bsCollapse.show(); // Expand the navbar
      }
      setdata(!data); // Toggle the state
    }
  };
  useEffect(()=>{
    if(newaddress && newaddress!=undefined){
      if(newaddress===true){
      setdisabled(true);
      setlivelocation(true);
      
      setlocationclicked(true);
    
      const fullAddress = distinct
      ? `${inputaddress.addressType},${inputaddress.flatNo}, ${inputaddress.landmark}, ${inputaddress.pincode}`
      : `${inputaddress.addressType},${address}, ${inputaddress.flatNo}, ${inputaddress.landmark}, ${inputaddress.pincode}`;
    
      setDefaultAddress(fullAddress);
      setnewaddress(false);
      }
    }
  })

  const SignupRedirect = () => {
    const mediaQuery = window.matchMedia('(max-width: 992px)'); // Media queries using JavaScript
    if (mediaQuery.matches) {
      const navbar = document.getElementById("navbarSupportedContent");
      const bsCollapse = new window.bootstrap.Collapse(navbar);
      bsCollapse.hide();
      setdata(!data);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };
  const locationHandler=()=>{
    setblock(false);
    setlocationclicked(true);
 
    // Set opacity of all elements to 0.5


    
  }
  const livelocationapi=()=>{
   setlivelocation(true);
  
   const loc=localStorage.getItem('location');
  
  setaddress(loc);
  

  setloading(true);
  setTimeout(()=>{
    setloading(false);
  },3000)
 
 
  }
  const CloseButton=()=>{
    newaddress=false;
    setlocationclicked(false);
    setlivelocation(false);
    document.getElementById('address').style.display="none";
    setdisabled(false);


  
   

  }
  const distinctAddressHandler=(e)=>{
    const val=e.target.innerText;
    setdisabled(true);
    setdistict(true);
    setcurrentAddress(val);
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setinputaddress((prevState) => ({
      ...prevState,
      [id]: value, // Update the respective field
    }));
  };



 // Using a for loop to populate the items array
 const len=Object.keys(userAddress).length;//for calculating json length
 for (let i = 0; i < len; i++) {
  addressArr.push(userAddress[i].address); // for pushing json into array
}

const getAddress=(e)=>{
const val=e.target.innerText;

const parentDiv = e.target.closest('.card-body');

// Remove any previously appended images from all divs
const allDivs = document.querySelectorAll('.card-body img');
allDivs.forEach((img) => img.remove());

// Create an image element
const img = document.createElement('img');
img.src = 'https://cdn-icons-png.freepik.com/256/5610/5610944.png?ga=GA1.1.1962969448.1717676862&semt=ais_hybrid';
img.alt = 'Appended Image';

img.style.height = '30px';
img.style.width='30px';

img.style.marginTop='-230px';
img.style.marginLeft='90%';

// Append the image to the clicked div
parentDiv.appendChild(img);
setcurrentAddress(val);
const div=document.querySelector('.location p').innerText=val.substring(0,5)+'...';
document.getElementById('location').style.marginTop="10px";

 
   


  


 
  

}
const Logout=()=>{
setblock(false);
const res=window.confirm("do you want to logout");
if(res){
 
 


  localStorage.removeItem('token');
 

}

 }






  return (
    
    <>


  
  
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar" style={{ height: loggedin ? '75px' : '',display:newaddress!=undefined?'none':'block' }}>
        <div className="container-fluid">
          <Link className="navbar-title" id="title" to="/">FOODPOINT</Link>
          <Link className='location' style={{display:loggedin?'block':'none'}} onClick={locationHandler} id='location'><img src='https://cdn-icons-png.flaticon.com/128/1865/1865269.png' height={'30px'}/> <p>{currentAddress!=''?currentAddress.substring(0,10)+'...':'Detect Live Location'}</p></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" id="toggler" onClick={dataHandler}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navitems" style={{ marginLeft: data ? "-65%" : "62%" }}>
              <li style={{ marginTop: data ? "25px" : "", marginLeft: data ? "4%" : "70%" }}>
                {!loggedin ? (
                  <button className="signin" onClick={SignupRedirect} id="login">
                    LOGIN&nbsp;/&nbsp;SIGNUP
                  </button>
                ) : (
                  <div className="profile">
                    <button style={{ border: 'none', backgroundColor: 'transparent'}} onClick={() => setblock(!block)}  >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
                        alt="User Icon"
                        height="31px"
                      />
                    </button>
                    <Link to="/cart">
                      <img src="https://cdn-icons-png.flaticon.com/128/1062/1062974.png" height={"36px"} alt="Profile"  />
                    </Link>

                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    

      {/* Profile Expander - Visible only when the profile button is clicked */}
      <div className='profileexpander' style={{ display: loggedin  && block  ? 'block' : 'none' }} onMouseOver={()=>setblock(true)} onMouseOut={()=>setblock(false)}>
        {/* Add any profile details here */}
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {loggedin &&
          <li>Hello {loggedin.name.substring(0,loggedin.name.indexOf(' '))}</li>}
      <div class="container">
 <div className='line'></div>
  <div class="triangle"></div>
</div>
   
          <li style={{marginTop:'10px'}}><Link to="/profile" style={{textDecoration:'none',color:'black'}} onClick={()=>setblock(false)}>Profile</Link></li>
          <li><Link to='/profile' style={{textDecoration:'none',color:'black'}} onClick={()=>setblock(false)}>Orders</Link></li>
          <li><Link to="#" style={{textDecoration:'none',color:'black'}} onClick={Logout} >Logout</Link></li>
        
         </ul>

      </div>
      <div className='container-box' style={{display:locationclicked?'block':'none'}}>
        
         <div className='close'>
         <Link onClick={CloseButton}> <img src='https://cdn-icons-png.flaticon.com/128/9426/9426995.png' height={'30px'}/></Link>
         </div>
        
         <div className='location-content'>
          <Link className='current-location-container' onClick={livelocationapi}><img src='https://cdn-icons-png.flaticon.com/128/1549/1549466.png' height={"26px"}/><p style={{display:'inline-block',marginLeft:'10px'}} >Get Current Location</p></Link><p id='gpstext'>Using GPS</p>

         </div>
       

      <div id='address' style={{display:livelocation && locationclicked?'block':'none'}}><div id='addresscontent'>Address:<p style={{display:livelocation && locationclicked?'block':'none'}}>{loading?(<div style={{marginTop:'-1%',marginLeft:'42%'}} id='beatloader'><BeatLoader  loading={loading} size={10} color={"green"}/></div>): (<p style={{fontWeight:'500'}}>{address}</p>)}</p></div>
      <button type="button" class="btn"  id='addressbtn' style={{borderRadius:'0',display:disabled || loading!=false?'none':'block'}} onClick={()=>setdisabled(true)}>Add More Details</button><br/><p id='or' style={{display:disabled || loading!=false?'none':'block'}}>OR</p>
      <button type="button" class="btn"  id='addressbtn2' style={{borderRadius:'0',display:disabled || loading!=false?'none':'block'}} onClick={(e)=>distinctAddressHandler(e)}>Add distinct Address</button>
      <div id='completeaddress' style={{display:disabled && livelocation && locationclicked?'block':'none'}}><form>
  <div class="mb-3">
    <label htmlfor="flatNo" class="form-label">Door Flatno.cannot be empty</label>
    <input type="text" class="form-control" id="flatNo"  value={inputaddress.flatNo} onChange={handleChange} required/>
   
  </div>
  <div class="mb-3">
    <label htmlfor="landmark" class="form-label">Landmark can not be empty</label>
    <input type="text" class="form-control" id="landmark" value={inputaddress.landmark} onChange={handleChange} required/>
  </div>
  <div class="mb-3">
    <label htmlfor="pincode" class="form-label">Pincode</label>
    <input type="number" class="form-control" id="pincode" value={inputaddress.pincode} onChange={handleChange} required/>
  </div>
  <div class="mb-3 form-check" id='radiobutton' >
 
  
</div>

  <button type="submit" class="btn btn-secondry" id='addresssubmit' onClick={addressSubmit}>Save Address & Proceed</button>
</form></div>
      </div>
      <div id='savedaddress'>
      
        <p>Saved Addresses</p>

     {
        addressArr.map((item,index)=>{
       
        const len=Object.keys(userAddress).length;
     

        
        
         return(

          
                  <div class="card"  id='addresscard'>
         
          <button class="card-body" onClick={getAddress}>
            <h5 class="card-title">{item.substring(0,item.indexOf(',')).toUpperCase()}</h5>
            <p class="card-text">{item.substring(item.indexOf(',')+1)}</p>
       
          </button>
        </div>
        )})}
 
   
      </div>
      <div id='logout'></div>
      </div>
    
    </>
  );
};

export default Navbar;
