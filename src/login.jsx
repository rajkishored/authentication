import axios from "axios";
import { useState } from "react";
import { DiVim } from "react-icons/di";
import Recover from "./forgotpass";


function Login({setlog}){

     let [respons,setresopnse]=useState("");
     let [forgot,setforgot]=useState(false);
    let [dataa,setdataa]=useState({
           
            lpassword:"",
            lemail:""
        })
    
        let handlechange=(e)=>{
            let {name,value}=e.target;
            setdataa({...dataa,[name]:value})
          
        }
    
        let handleform=async(e)=>{
         e.preventDefault();
         console.log(dataa);
       

        let response=await axios.post("http://localhost:3001/log" ,dataa)
         setresopnse(response.data.message)
        
        if(response.data.message=="Successfull"){
           
            setlog(true);
         }
         
        }



    return (
       
        <div className="reg">
           {(!forgot)?
           <div className="reg2">
           <form  onSubmit={handleform}>
          
          <label htmlFor="">Email:</label><input type="email" name="lemail" value={dataa.lemail}  onChange={handlechange}required />
          <label htmlFor="">Password:</label><input type="password"  value={dataa.lpassword} name="lpassword" onChange={handlechange} minLength={8} required />
          <button className="reg_btn"type="submit">Login</button>
          
          </form>
          <button className="forgot" onClick={()=>setforgot(true)}> forgot password?</button>
          <p>{respons}</p>

          </div> : <Recover/>} 
           
        </div>
    )
}

export default Login