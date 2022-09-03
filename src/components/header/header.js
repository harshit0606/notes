import React from 'react'
import "./header.css";
import Logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom';
import {BiSearch} from "react-icons/bi";
import {IoColorFilter} from "react-icons/io5"
import {FaListUl} from "react-icons/fa"
import {GiHamburgerMenu} from "react-icons/gi";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import toggleSidebar from '../../redux/actions/sidebar';
import toggleTheme from '../../redux/actions/theme';

function Header() {
  let toggle=useSelector((state)=>state.sidebar);
  let dispatch=useDispatch();
  let theme=useSelector((state)=>state.theme);
  console.log(theme);
  return (
    <div className='header_main'>
      <div className='header_left'>
      <GiHamburgerMenu onClick={()=>dispatch(toggleSidebar(toggle))} className='header_ham'/>
        <img src={Logo}/>
        <Link to="/"><h1>Notes</h1></Link>
      </div>
      <div className='header_center'>
      <div className={theme?'header_search':'header_searchdark'}>
        <BiSearch className='search_icon'/>
        <input type="text"/>
      </div>
      </div>
      <div className='header_right'>
      <IoColorFilter onClick={()=>dispatch(toggleTheme(theme))} className='header_icons'/>
      <FaListUl className='header_icons'/>
      </div>
    </div>
  )
}

export default Header