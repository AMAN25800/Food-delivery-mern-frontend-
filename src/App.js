import logo from './logo.svg';
import './App.css';
import { Routes,Route,BrowserRouter} from 'react-router-dom';
import Signin from './Components/Signin';
import LiveLocation from './Components/LiveLocation';
import Navbar from './Components/Navbar';
import FormData from './Components/FormData';
import Profile from './Components/Profile';
import Main from './Components/Main';
import Protected from './Components/Protected';
import Signup from './Components/Signup';
import CartContainer from './Components/CartContainer';
import { CartProvider } from './Components/CartContext';

import EmailVerifier from './Components/EmailVerifier';
import UpdatePassword from './Components/UpdatePassword';

function App() {

 
  return (
  

    <div className="App">
    <CartProvider>
        
         <Main />
        
          
          
       
   
        <Routes>
          <Route path='/location' element={<LiveLocation/>}/>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/forms' element={<FormData/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/user' element={<Protected/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/cart' element={<CartContainer/>}/>
        
          <Route path='/verify' element={<EmailVerifier/>}/>
          <Route path='/updatepass' element={<UpdatePassword/>}/>
          <Route path='/profile' element={<Profile/>}/>
         
         
        </Routes>
        </CartProvider>
      
     
    </div>
  );
}

export default App;
