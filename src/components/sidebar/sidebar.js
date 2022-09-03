import React from 'react'
import {useSelector} from "react-redux";
import {AiOutlineBulb} from "react-icons/ai"
import {BsBell} from "react-icons/bs"
import {FiEdit2} from "react-icons/fi"
import {IoTrashOutline} from "react-icons/io5";
import {MdOutlineArchive} from "react-icons/md";
import { Link,useLocation} from 'react-router-dom';

import"./sidebar.css";
function Sidebar() {
    const state=useSelector((state)=>state.sidebar);
    const theme=useSelector((state)=>state.theme);
    console.log(state);
    let location=useLocation();
    console.log(location.pathname);

  return (
    <div className={state?`sidebar_main`: `sidebar_main collapsed`}>
    <Link to ="/">
        <div className={theme?`sidebar_tab ${location.pathname==='/'?'active':''}`:`sidebar_tab dark${location.pathname==='/'?'active':''}`}>
            <AiOutlineBulb/>
            <h2>Notes</h2>
        </div></Link>
        <Link to ="/reminders">
        <div className={theme?`sidebar_tab ${location.pathname==='/reminders'?'active':''}`:`sidebar_tab dark${location.pathname==='/reminders'?'active':''}`}>
            <BsBell/>
            <h2>Reminders</h2>
        </div></Link>
        <Link to ="/editlabel">
        <div className={theme?`sidebar_tab ${location.pathname==='/editlabel'?'active':''}`:`sidebar_tab dark${location.pathname==='/editlabel'?'active':''}`}>
            <FiEdit2/>
            <h2>Edit Labels</h2>
        </div>
        </Link>
        <Link to ="/archives">
        <div className={theme?`sidebar_tab ${location.pathname==='/archives'?'active':''}`:`sidebar_tab dark${location.pathname==='/archives'?'active':''}`}>
            <MdOutlineArchive/>
            <h2>Archives</h2>
        </div>
        </Link>
        <Link to ="/trash">
        <div className={theme?`sidebar_tab ${location.pathname==='/trash'?'active':''}`:`sidebar_tab dark${location.pathname==='/trash'?'active':''}`}>
    
            <IoTrashOutline/>
            <h2>Trash</h2>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar;