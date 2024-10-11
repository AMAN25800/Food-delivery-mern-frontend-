import React, { useEffect } from "react";
import './FormData.css'
import { useState } from "react";
import { addFood } from "../service/api";
const FormData=()=>{
  const defaultValue={
    email:'',
    pass:'',
  }
  const foodata={
    name:'pav bhaji',
    item_img:'img.jpeg',
    description:'this is pav baji',
    price:20,
    quantity:1,

  }
  const[items,setitems]=useState(foodata);
  const [email,setemail]=useState('');
  const[password,setpassword]=useState('');
  
   const addFoodDetails=async ()=>{
await addFood(items); 
   }
  
  
 return(
   
    <>
     <div className="forms">
     <form  >
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name="pass"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary" onClick={addFoodDetails}>Submit</button>
</form>
     </div>
    </>
 )
}
export default FormData;