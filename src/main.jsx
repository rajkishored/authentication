import react, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios  from "axios";


function Main(){
    let url="https://sonnys-ai-app.onrender.com"
    let url2="http://localhost:3001"
    let [data,setdata]=useState("");
    let [promptt,setpromptt]=useState("");
    let [load,setload]=useState(false)
    let handlesub=async(e)=>{   
        e.preventDefault();
        setload(true)

            try{
      let  response=await axios.post(url+"/ai",{promptt});
         console.log(response.data.message);
         setdata(response.data.message)
         setload(false)
         
            }

            catch(error){
                console.log(error.stack);
                
            }

   
    }

    return(
      
        <div className="aii">
           <form onSubmit={handlesub}>
            <input type="text"  onChange={(e)=>setpromptt(e.target.value)} required placeholder="Ask me anything...."/>
        <button  className="aii_btn" type="submit">Get</button>
       
        </form> 
        <div className="ai_data">
            {(load)?  <img src="load.gif" alt="" />:""}
           
      <p className="pp">{data}</p>
      </div>
        <footer>
            <p style={{fontSize:"10px"}}>@rajkishoredjr</p>
        </footer>
        </div>
    )
}
export default Main;