import React from 'react'
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
function Home() {
  return (
    <div>
        <Header/>
        <div className='home_main'>
          <div className='home_left'>
            <Sidebar/>
          </div>
          <div className='home_right'>

          </div>
        </div>
    </div>
  )
}

export default Home