import react, { useState } from "react";

import axios from "axios";
import Repass from "./Repassword";

function Recovery({mail}){

    let[otp,setotp]=useState('');
    let [verify,setverify]=useState(false);
    let [enterotpp,setenterotpp]=useState(false);
    let [responsee,setresopnse]=useState('')
    let url="https://sonnys-ai-app.onrender.com"
    let url2="http://localhost:3001"

    let handleform=async(e)=>{
        setverify(true)
        e.preventDefault();
       try{
           let response=await axios.post(url+"/verify",{otp,mail})
                setresopnse(response.data.message);
                if(response.data.message=="OTP verified"){
                    setverify(false)
                    setenterotpp(true);
                }
       }
       catch(error){

        console.log(error.stack);
        
       }


    }

return(
    <div className="reg2">
            {(!enterotpp)? <div>
        <form  onSubmit={handleform}>
       
       <label htmlFor="">OTP:</label><input type="number" name="otp"   onChange={(e)=>setotp(e.target.value)}  required />
      
       <button className="reg_btn"type="submit">Verify</button>
       
       </form>
       {(verify)? <p>verifying........</p>: ''}
       <p>{responsee}</p>
       </div>: <Repass maill={mail}/>}
            
       </div>
)

}
export default Recovery;