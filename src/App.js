
import { useState } from 'react';
import './App.css';
import Page from './log_reg';

import { GrLinkNext } from "react-icons/gr";

function App() {
 
let [next,setnext]=useState(true);

  return (
    <div className="App">
      {(next)?<div className='start'>
          <h1  className="st">Lets get started...</h1>
          <button onClick={()=>setnext(!next)}>Start  <span> <GrLinkNext/></span> </button>
        </div> : <Page/>}
     
    </div>
  );
}

export default App;
