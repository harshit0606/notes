import React, { useEffect, useState } from 'react'
import Header from "../header/header";
import { Outlet } from 'react-router-dom';
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import "./home.css"
import Notes from '../notes/notes';
function Home() {
  const [notes,setNotes]=useState([{}]);
  useEffect(()=>{
    axios.get('https://notes-backend-beta.vercel.app/api/getnotes').then((res)=>{
      
        console.log(res.data);
        setNotes(res.data);
            }
    ).catch((err)=>{
      console.log(err);
    })
  },[]);
  return (
    <div>
        <Header/>
        <div className='home_main'>
          <div className='home_left'>
            <Sidebar/>
          </div>
          <div className='home_right'>
              <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Home