import react, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import Register from "./register";
import Login from "./login";

import Main from "./main";
import axios from "axios";


function Page(){
 let url2="http://localhost:3001"
let url="https://sonnys-ai-app.onrender.com";
    let [log,setlog]=useState(false);

    useEffect(()=>{
    
        Check();
       
       
      },[])


    let refreshToken=async()=>{
        const rtoken=localStorage.getItem("rjws_token");
        console.log(rtoken);
        if(!rtoken){
            // alert("please login");
            return;
        }
        
        try{
            const resp=await axios.post(url+"/refresh_tok",{rtoken});
            console.log(resp.data.accesstoken);
            localStorage.setItem("ajws_token",resp.data.accesstoken);
            Check();
    
        }
        catch(error){
            console.error("Refresh token failed:", error);
                    alert("Session expired. Please log in again.");
        }
    };

  

   let Check=async()=>{
    
   
     let atoken=localStorage.getItem("ajws_token");
     console.log(atoken);
     
     if(!atoken){
        // alert("please login");
        return;
    } 
    try{
       let resp=await axios.post(url+"/access_chec",{atoken},{
        headers:{
            Authorization: `Bearer ${atoken}`
       }}
       );
       
        console.log(resp.data.mm);
        if(resp.data.m=="true"){
            setlog(true)
        }
        else{
                // alert("please login")
        }
        
        
    }
    catch(error){
        // console.log(error.stack,"hel");
     if(error.status == 401){
        console.log("expires");
        await refreshToken();

        
    }
    
    
        
    }

  


   }


    let [reg,setreg]=useState(false);

    return(
        <div className="page">
       {(!log)?  <Router>
            <h2>Complete to continue..</h2>
            <Link style={{textDecoration:"none", color:"white",border:"1px solid black" ,padding:"5px 10px",borderRadius:"3px",backgroundColor:"#8a56bd"}} to="/reg">Register</Link>
            <Link style={{textDecoration:"none", color:"white",border:"1px solid black" ,padding:"5px 10px",borderRadius:"3px", marginLeft:"10px",backgroundColor:"#8a56bd"}} to="/log">Login</Link>
            <hr />
             <Routes>
                <Route path="reg" element={<Register/>}/>
                <Route path="log" element={<Login  setlog={setlog}/>}/>
             </Routes>
            </Router>:<Main setlog={setlog}/>}
            
            
        </div>
    )

}

export default  Page;