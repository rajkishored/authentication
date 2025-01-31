import react, { use, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Repass({maill}){

    let [npass,setnpass]=useState("");
    let [cpass,setcpass]=useState("");
    let [responser,setresponsr]=useState("")
    let [send,setsend]=useState(false); 



    let handleform=async(e)=>{
            e.preventDefault();
            
            if(npass!==cpass){
                toast.warn('Password dosent match', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,});
                return;
            }
             
            try{
                let responsee=await axios.post("http://localhost:3001/changepass",{maill,npass});
                setresponsr(responsee.data.message)
                if(responsee.data.message=="password set successfully"){
                    

                    toast.success('Successfull Login to start', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,});
                    setTimeout(()=>{
                        window.location.reload();
                    },2000);
                        
                }
            }
            catch(error){
                    console.log(error.stack);
                    
            }
            if(send){
               
            }

    }

    return(
        <div className="reg2">
        <ToastContainer/> 
    <form  onSubmit={handleform}>
   
   <label htmlFor="">New Password:</label><input type="password" name="newpass"   onChange={(e)=>setnpass(e.target.value)}  min={8}required />
   <label htmlFor="">Confirm Password:</label><input type="password" name="confirmpass"   onChange={(e)=>setcpass(e.target.value)} min={8}required />
   <button className="reg_btn"type="submit">Submit</button>
   
   </form>
   {/* {(send)? <p>sending........</p>: ''} */}
   <p>{responser}</p>
  
        
   </div>
    )
}
export default Repass;