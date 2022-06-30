import React from "react";
import './Header.css'
import logoImg from '../assets/netflixlogo.png'
import usuarioImg from '../assets/usuario.webp'

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/"><img src={logoImg} alt="logo netfilx"/></a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src={usuarioImg} alt="usuario"/>
                </a>
            </div>
        </header>
    )
}