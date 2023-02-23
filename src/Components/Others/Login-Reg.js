import React, { useState } from 'react'

import Login from '../Registration/Login';
import Registration from '../Registration/Registration';
import loginImg from "./login-img1.gif"
import regImg from "./reg-img.gif"
import "./Style.css"
import { Link } from 'react-router-dom';

const LoginReg = () => {
    const [alter, setAlter] = useState(false)

    let update = () => {
        setAlter(!alter)
    }

    return (
        <div>
            <div className='heading'>
                <Link to="/">
                <img src="https://shsroundtable.com/wp-content/uploads/2023/01/chat-gpt-logo.jpg" alt="" className='logo' /></Link>
                <p className="name">Nex ChatGPT</p>
            </div>
            <div className='login-reg-body'>
                
                <div className="login-reg-container">
                    <Login alter={alter} update={update} />
                    <div className='loginImg'>
                        <img src={loginImg} alt=""></img>
                    </div>
                </div>


                <div className="login-reg-container">
                    <div className='regImg'>
                        <img src={regImg} alt=""></img>
                    </div>
                    <Registration alter={alter} update={update} />
                </div>
            </div>
        </div>
    )
}

export default LoginReg;