import axios from "axios";
import { useState } from "react";
import { DiVim } from "react-icons/di";
import Recover from "./forgotpass";


function Login({setlog}){

    let url="https://sonnys-ai-app.onrender.com"
    let url2="http://localhost:3001"
     let [respons,setresopnse]=useState("");
     let [forgot,setforgot]=useState(false);
     let [load,setlode]=useState(false);
    let [dataa,setdataa]=useState({
           
            lpassword:"",
            lemail:""
        })
    
        let handlechange=(e)=>{
            let {name,value}=e.target;
            setdataa({...dataa,[name]:value})
          
        }
    
        let handleform=async(e)=>{
            setlode(true)
         e.preventDefault();
         console.log(dataa);
       
            try{
        let response=await axios.post(url+"/log" ,dataa)
       
        //  setresopnse(response.data.message)
        //  console.log(response.data.token,"h");
        //  localStorage.setItem('jws_token',response.data.token)
        if(response.data.refreshToken || response.data.accessToken ){
            console.log(response.data.refreshToken)
            console.log(response.data.accessToken)
            
            localStorage.setItem('rjws_token',response.data.refreshToken)
            localStorage.setItem('ajws_token',response.data.accessToken)

        //    let a= localStorage.getItem('jws_token')
        //    console.log(a,"this is");
           setlode(false);
            setlog(true);
        }
        else{
            setresopnse(response.data.message );
        }
    }
    catch(error){
      setresopnse("try again")
    }}
        
        // if(response.data.message=="Successfull"){
           
           
        //     setlog(true);

        //  }
         
        // }



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
          {(load)? <p>logging...</p>: ''  }

          </div> : <Recover/>} 
           
        </div>
    )
}

export default Login