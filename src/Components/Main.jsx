import react, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import ItemsData from './ItemsData'
import { useNavigate } from 'react-router-dom'
import './Main.css';
import { jwtDecode } from 'jwt-decode';
import LiveLocation from './LiveLocation'
import Protected from './Protected'
const Main=(e)=>{
   
    const navigate=useNavigate();

 
    const[isopacity,setisopacity]=useState(false);

    const token=localStorage.getItem('token');
    const location=localStorage.getItem('location');
 
  
    return(
      
      
        <div>

        {!location &&<LiveLocation/>}
       {token?
         <div ><Protected /><Slider/><div id='items'><ItemsData/></div></div>: <div>
        <Navbar/>
        <Slider/>
        <div id='items'>
        <ItemsData/>
        </div>
        </div>}
        </div>
       
    )
}
export default Main;