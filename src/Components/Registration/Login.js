import React, { useState } from 'react'
import axios from 'axios'
import loginImg from "../Pics/login-img1.gif"
import { Link } from 'react-router-dom'
import { } from 'react-router-dom'
import "./Style.css"

const Login = (props) => {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handelLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const obj = JSON.stringify({
            email: loginEmail,
            password: loginPassword,
        })

        await axios.post('https://embarrassed-scarf-fish.cyclic.app/login', obj, { headers: { "Content-Type": "application/json" } }).then((res) => {
            setIsLoading(false);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('email', res.data.email)

                window.alert("Welcome " + res.data.name)
                window.history.pushState({ path: "/" }, '', "/");
                return (props.setAlter(!props.alter))
            }
            alert("Wrong Credentials")
        }).catch((error) => {
            setIsLoading(false);
            console.log(error)
        });
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
                    <div className={"login-container"}>
                        <form onSubmit={handelLogin}>
                            <div className="login-heading">Login...</div>

                            <label className='login-label'>Email Address :</label><br />
                            <input type="email" className='login-input' value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} required></input><br />

                            <label className='login-label'>Password :</label><br />
                            <input type="Password" className='login-input' value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value) }} required></input><br />

                            {isLoading && <div><button className='reg-submit'>Please Wait...</button><br /></div>}
                            {!isLoading && (
                                <div>
                                    <input type="Submit" className='login-submit' value="Login"></input><br />
                                </div>
                            )}
                            <Link to="/registration" className='login-link'>Register with Nex ChatGPT</Link>
                        </form>


                    </div>
                    <div className='loginImg'>
                        <img src={loginImg} alt=""></img>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login