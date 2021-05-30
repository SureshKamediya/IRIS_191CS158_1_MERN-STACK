import React from 'react';
import './Header.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
 
//npm install @material-ui/icons to get the icons
//npm install @material-ui/core have to install both core and icons thing
function Header() {        // rfce working now found beteer than sfc   //omighs terminal style // what is pwj
    return (
        <div className ="header">
        <IconButton>
            <AccountBoxIcon fontSize = 'large' className = 'header_icon'/>
        </IconButton>

        <img
        className = "header_logo" 
        src ="https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png"
        alt=""  
        />

        <IconButton>
            <ForumIcon fontSize ="large" className ='header_icon'/>
        </IconButton>

            
        </div>
    )
}

export default Header
