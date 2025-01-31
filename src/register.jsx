import { useState } from "react";
import { CgPassword } from "react-icons/cg";
import axios from "axios";



function Register(){

    let [responseMessage,setResponseMessage]=useState('')

    let [data,setdata]=useState({
        uname:"",
        upassword:"",
        email:""
    })

    let handlechange=(e)=>{
        let {name,value}=e.target;
        setdata({...data,[name]:value})
      
    }

    let handleform=async(e)=>{
     e.preventDefault();
     console.log(data);
     
     try{
     const response =await axios.post("http://localhost:3001/reg" ,data )
     setResponseMessage(response.data.message); 
     
     }
     catch(error){
        console.log(error.stack);
        if (error.response) {
            
            setResponseMessage(error.response.data.message); 
          } else {
           
            setResponseMessage('Server error, please try again later');
          }
        
     }
     
        
    }

    return(
        <div className="reg">
            <div className="reg2">
            <form  onSubmit={handleform}>
           <label htmlFor="">Name:</label><input type="text" value={data.uname} name="uname" onChange={handlechange} required min={4}/>
           <label htmlFor="">Email:</label><input type="email" name="email" value={data.email}  onChange={handlechange}required />
           <label htmlFor="">Password:</label><input type="password"  value={data.upassword} name="upassword" onChange={handlechange} minLength={8} />
           <button className="reg_btn"type="submit">Register</button>
           </form>
           </div>
           <p>{responseMessage}</p>
        </div>
    )
}
export default Register;