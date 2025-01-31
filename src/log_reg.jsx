import react, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import Register from "./register";
import Login from "./login";

import Main from "./main";


function Page(){

    let [log,setlog]=useState(false);
    // let [reg,setreg]=useState(false);

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
            </Router>:<Main/>}
            
            
        </div>
    )

}

export default  Page;