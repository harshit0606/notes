import React from 'react'
import {useSelector} from "react-redux";
function Sidebar() {
    const state=useSelector((state)=>state.sidebar);
    console.log(state);

  return (
    <div className='sidebar_main'>
        
    </div>
  )
}

export default Sidebar