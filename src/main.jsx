import react, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios  from "axios";


function Main(){

    let [data,setdata]=useState("");
    let [promptt,setpromptt]=useState("");
    let handlesub=async(e)=>{   
        e.preventDefault();

            try{
      let  response=await axios.post("http://localhost:3001/ai",{promptt});
         console.log(response.data.message);
         setdata(response.data.message)
         
            }
            catch(error){
                console.log(error.stack);
                
            }

   
    }

    return(
      
        <div>
           <form onSubmit={handlesub}>
            <input type="text"  onChange={(e)=>setpromptt(e.target.value)}/>
        <button type="submit">Get</button>
       
        </form> 
      <p>{data}</p>
        
        </div>
    )
}
export default Main;