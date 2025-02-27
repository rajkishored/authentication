import react, { useEffect, useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios  from "axios";


function Main({setlog}){
    let url="https://sonnys-ai-app.onrender.com"
    let url2="http://localhost:3001"
    let [data,setdata]=useState("");
    let [promptt,setpromptt]=useState('');
    let [load,setload]=useState(false)



    let handlechange=(e)=>{
        setpromptt(e.target.value)
    }
    // useEffect(()=>{
    //     handlesub();
    // },[])

    // let fetchprotected=async()=>{
            
    // }
    let logout = ()=>{
        localStorage.removeItem("ajws_token");
        localStorage.removeItem("rjws_token");
        setlog(false)

    }




    let handlesub=async(e)=>{   
        e.preventDefault();

        let tokenn=localStorage.getItem('ajws_token');
            if(!tokenn){
                alert("please login");
                return;
            } 
            setload(true);
        // setload(true)



        // let token= localStorage.getItem("jws_token")
        // console.log(token);
            
        // if(!token){
        //     return;
        // }

      try{
               

      let  response=await axios.post(url+"/ai",{promptt},{
        headers:{
             Authorization: `Bearer ${tokenn}`
        }
      });
      
      
         console.log(response.data.message);
         setdata(response.data.message)
        
         setload(false)
         document.getElementById("ask").value="";

         
            }

            catch(error){
                if(error.response && error.response.status == 401){
                    await refreshToken();
                }
                
            }

     let refreshToken =async()=>{
                const rtoken=localStorage.getItem("rjws_token");
                if(!rtoken){
                    alert("please login again");
                    return;
                }

                try{
                    const resp=await axios.post(url+"/refresh_tok",{rtoken});
                    console.log(resp.data.accesstoken);
                    localStorage.setItem("ajws_token",resp.data.accesstoken)
                    handlesub();

                }   
                catch(error){
                    console.error("Refresh token failed:", error);
                    alert("Session expired. Please log in again.");
                }
            };
    
    //     const token = localStorage.getItem("jws_token");
    //     if (!token) {
    //         console.log("No token found, redirecting to login.");
    //         return;
    //     }

    //         try {
    //             const response = await axios.get("http://localhost:3001/protected", {
    //               headers: {
    //                 Authorization: `Bearer ${token}`, // Send the token as Authorization header
    //               },
    //             });
    //                 console.log(response.data.message);
                    
    //             // setdata(response.data.message);
    // }
    // catch(error){

    // }
    
   
     }
  
    
    return(
      
        <div className="aii">
           <form onSubmit={handlesub}>
            <input type="text" id="ask"  onChange={handlechange} required placeholder="Ask me anything...."/>
        <button  className="aii_btn" type="submit">Get</button>
       
        </form> 
        <div className="ai_data">
            {(load)?  <img src="load.gif" alt="" />:""}
           
      <p className="pp">{data}</p>
      
      </div>
      <button className="lout" onClick={()=>logout()}>Logout</button>
     
        <footer>
            <p style={{fontSize:"10px"}}>@rajkishoredjr2024</p>
           
        </footer>
        </div>
    )
}
export default Main;