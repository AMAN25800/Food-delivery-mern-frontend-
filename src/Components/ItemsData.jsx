


//it is the important file kindly refer the itemData.jsx and itemData.css both are imp.
import React, { useState,useContext } from 'react';
import './ItemsData.css';
import { items } from '../assets/assets';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GridLoader, HashLoader} from 'react-spinners';
let insertedItems = {};




const ItemsData = () => {
  const values={
   itemname:'',
   item_img:'',
   desc:'',
   price:0,
   quantity:'',


  }
  const navigate=useNavigate();
  
  const [data,setdata]=useState(values);
 const[clickedcart,setclickedcart]=useState(false);
  const [itemCounts, setItemCounts] = useState({}); // Holds counts for all items
  const { cart,addToCart, removeFromCart } = useContext(CartContext);
  

  const changeEffect = (e) => {
    
    const val = e.target.name;
    
    document.getElementById(val + 'inc').style.display = 'block';

  
   
    
  
   
    document.getElementById(val + 'dec').style.display = 'block';
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [val]:1, // Increment the specific item's count
    }));
    const itemIndex = items.findIndex(item => item.name === val);
    if (itemIndex !== -1) {
      addToCart(items[itemIndex]); // Add item to cart when first clicked
    }
    
  };

  const Incrementer = (e) => {
    const itemName = e.currentTarget.name;
    
 
   
    if(itemName){

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: (prevCounts[itemName] || 1) + 1, // Increment the specific item's count
    }));
  
    const itemIndex = items.findIndex(item => item.name === itemName);
  
    if (itemIndex !== -1) {
      addToCart(items[itemIndex]); 
      setdata((prevData) => {
        // Check if the item is already in the cart
        if (prevData.name === itemName) {
          // Item already exists, update the price and quantity
          return {
            ...prevData,
            price: Number(items[itemIndex].price) * itemCounts[itemName],
            quantity: Number(itemCounts[itemName]),
          };
        } else {
          // Item is not in the cart yet, add new item
          return {
            ...prevData,
            itemname: items[itemIndex].name,
            item_img: items[itemIndex].item_img,
            desc: items[itemIndex].desc,
            price: items[itemIndex].price,
            quantity: Number(itemCounts[itemName]),
            
          };
        }
        
      });
    }
    }
  }




  

  const Decrementer = (e) => {
    const itemName = e.currentTarget.name;
    if(itemName){
   

    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: Math.max((prevCounts[itemName] || 0) - 1, 0), // Decrement without going below 0
    }));
    const itemIndex = items.findIndex(item => item.name === itemName);
  
    if (itemIndex !== -1) {
      setdata((prevData) => {
        // Check if the item is already in the cart
       
          // Item already exists, update the price and quantity
          return {
            ...prevData,
            price: Number(items[itemIndex].price) * itemCounts[itemName],
            quantity: Number(itemCounts[itemName]),

          };
          
         
      });
    }


    }
    const Index = items.findIndex(item => item.name === itemName);
    if (Index !== -1 && itemCounts[itemName] > 1) {
      addToCart(items[Index]); // Update cart on decrement
    } else {
      removeFromCart(itemName); // Remove from cart when count reaches 0
    }

  
}

const redirectToCart=()=>{
  setclickedcart(true);
  setTimeout(()=>{
    setclickedcart(false);
      navigate('/cart')
  },2000)

}
  
  return (
    <>
    <div id='loader' style={{display:clickedcart?'block':'none'}}><HashLoader size='50' color='pink' loading='true' ></HashLoader></div>
    <button id='checkout' style={{display:cart.length!=0?'block':'none'}} onClick={redirectToCart}>{cart.length} <p>item added</p><button id='viewcart' onClick={redirectToCart}>VIEW CART</button></button>
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p>Best Food In Bangalore with many varieties</p>
      <h1 style={{ position: 'absolute', left: '10%', fontSize: '30px', marginTop: '35px' }}>
        What's on your mind
      </h1>

      <div className='explore-menu-list'>
        {items.map((item, index) => {
          if (index < 12) {
            return (
              <div className="card" style={{ width: '18rem', height: '24rem' }} key={index}>
                <img src={item.item_img} className="card-img-top" alt="..."  />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.desc}</p>
                </div>
                <button
                  type='button'
                  className='btn btn-light'
                  id={item.name}
                  style={{ marginTop: '-1rem', paddingTop: '0.5rem',display:itemCounts[item.name]>0?'none':'block' }}
                  onClick={(e) => changeEffect(e)}
                  name={item.name}
                >
                  ADD
                </button>
                <div id='price' style={{ marginTop: '-2.7rem', marginLeft: '12.5rem', color: 'black', fontWeight: 'bold', fontSize: '22px'}}>
                    &#8377;{
                    itemCounts[item.name] > 1?Number(item.price)*itemCounts[item.name]:item.price}
                  </div>
                  <button
                    id={item.name + 'inc'}
                    style={{ display:itemCounts[item.name]>0?'block': 'none',marginLeft: '11rem', borderRadius: '0px', boxShadow: 'none', backgroundColor: 'transparent', border: 'none', fontWeight: 'bold',marginTop:'-35px', width: '16%'}}
                    onClick={(e) => Incrementer(e)}

                    
                    name={item.name}
                  >
                  <img src='https://cdn-icons-png.flaticon.com/128/8371/8371357.png' style={{height:"35px",marginTop:'-30px'}} alt=''/>
                  </button>
                  {itemCounts[item.name] >= 1 ? (
                   
                    <div style={{ marginLeft: '9rem', fontWeight: 'bold', fontSize: '22px'}}>
                     <p style={{marginLeft:'-7rem',marginTop:'-4.5rem'}}> {itemCounts[item.name]}</p>
                    </div>):(  <div style={{display:'none'}}>
                    </div>)
                    
                  }
                  <button
                    id={item.name + 'dec'}
                    style={{ display:itemCounts[item.name]>0?'block': 'none', marginLeft: '4rem', marginTop: '-3.7rem', borderRadius: '0px', width: '15%', boxShadow: 'none', fontSize: '35px', backgroundColor: 'transparent', border: 'none', fontWeight: 'bold', color: 'red',width:'16%' }}
                    onClick={(e) => Decrementer(e)}
                    
                    name={item.name}
                  >
                    <img src='https://cdn-icons-png.flaticon.com/128/4561/4561935.png' style={{height:"35px",marginTop:'1px'}} alt=''/>
                  </button>
                </div>
            );
          }
          return null;
        })}
      </div>

      <div className='starters'>
        <h1 style={{ marginTop: '4rem', fontSize: '32px', display: 'flex', marginLeft: '8%' }}>
          Fast Food
        </h1>
        <div className='explore-menu-list2'>
          {items.map((item, index) => {
            if (index >= 12) {
              return (
                <div className="card" style={{ width: '18rem', height: '24rem' }} key={index}>
                <img src={item.item_img} className="card-img-top" alt="..."  />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.desc}</p>
                </div>
                <button
                  type='button'
                  className='btn btn-light'
                  id={item.name}
                  style={{ marginTop: '-1rem', paddingTop: '0.5rem',display:itemCounts[item.name]>0?'none':'block' }}
                  onClick={(e) => changeEffect(e)}
                  name={item.name}
                >
                  ADD
                </button>
                <div id='price' style={{ marginTop: '-2.7rem', marginLeft: '12.5rem', color: 'black', fontWeight: 'bold', fontSize: '22px'}}>
                    &#8377;{
                    itemCounts[item.name] > 1?Number(item.price)*itemCounts[item.name]:item.price}
                  </div>
                  <button
                    id={item.name + 'inc'}
                    style={{ display:itemCounts[item.name]>0?'block': 'none',marginLeft: '11rem', borderRadius: '0px', boxShadow: 'none', backgroundColor: 'transparent', border: 'none', fontWeight: 'bold',marginTop:'-35px', width: '16%'}}
                    onClick={(e) => Incrementer(e)}

                    
                    name={item.name}
                  >
                  <img src='https://cdn-icons-png.flaticon.com/128/8371/8371357.png' style={{height:"35px",marginTop:'-30px'}} alt=''/>
                  </button>
                  {itemCounts[item.name] >= 1 ? (
                   
                    <div style={{ marginLeft: '9rem', fontWeight: 'bold', fontSize: '22px'}}>
                     <p style={{marginLeft:'-7rem',marginTop:'-4.5rem'}}> {itemCounts[item.name]}</p>
                    </div>):(  <div style={{display:'none'}}>
                    </div>)
                    
                  }
                  <button
                    id={item.name + 'dec'}
                    style={{ display:itemCounts[item.name]>0?'block': 'none', marginLeft: '4rem', marginTop: '-3.7rem', borderRadius: '0px', width: '15%', boxShadow: 'none', fontSize: '35px', backgroundColor: 'transparent', border: 'none', fontWeight: 'bold', color: 'red',width:'16%' }}
                    onClick={(e) => Decrementer(e)}
                    
                    name={item.name}
                  >
                    <img src='https://cdn-icons-png.flaticon.com/128/4561/4561935.png' style={{height:"35px",marginTop:'1px'}} alt=''/>
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
    </>
  );
};


export default ItemsData;
