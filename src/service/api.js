import axios from 'axios';
const URL='http://localhost:8000';
 const addFood=async (data)=>{
    try{
       
        await axios.post(`${URL}/addfood`,data)//sends the data as the object
    }
    catch(error){
        console.log("error while calling add food api",error);
    }
}
    const addUser=async (data)=>{
        try{
            await axios.post(`${URL}/adduser`,data)

        }
        catch(error){
            console.log("error while calling add user api",error);
        }
    }
   
      
    


export {addFood,addUser};