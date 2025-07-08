import React from 'react';  
import "../styles/Header.css";
import Logo from "/imgs/ikenobo_logo.png";
import Nav from './Nav';

function Header() {  
    return (  
        <header className="header-container">
            
            <div className="logo">
                <img src={Logo} alt="Logo Ikenobo" className="logo-img" />
            </div>
            
        </header>  
    );  
}  
export default Header;