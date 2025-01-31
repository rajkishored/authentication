import axios from "axios";
import react, { useState } from "react";
import Recovery from "./Recovery";


function Recover(){

    let [maill,setmaill]=useState('') ;
    let [send,setsend]=useState(false);
    let [responsereturn,setresponsereturn]=useState('')
    let [enterotp,setenterotp]=useState(false);


let handleform=async(e)=>{
    e.preventDefault(); 
    setsend(true)
    console.log(maill);
    

    try{
        let resposns= await axios.post("http://localhost:3001/otp",{maill})
        setresponsereturn(resposns.data.message)

        if(resposns.data.message == "otp sent successfully"){
            
            setsend(false)
            setenterotp(true)
            
        }
        else{
            setsend(false)
        }
    }
    catch(error){
        console.log(error.stack);
        
    }
    
}

    return(
        
        <div className="reg2">
            {(!enterotp)? <div>
        <form  onSubmit={handleform}>
       
       <label htmlFor="">Email:</label><input type="email" name="lemail"   onChange={(e)=>setmaill(e.target.value)} required />
      
       <button className="reg_btn"type="submit">Get OTP</button>
       
       </form>
       {(send)? <p>sending........</p>: ''}
       <p>{responsereturn}</p>
       </div>: <Recovery mail={maill}/>}
            
       </div>
    )

}
export default Recover;