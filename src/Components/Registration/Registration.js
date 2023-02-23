import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import regImg from "../Pics/reg-img.gif"
import "./Style.css"

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    let OTP;
    const handelData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const obj = JSON.stringify({
            name: name,
            email: email,
            password: password,
        })

        await axios.post('https://embarrassed-scarf-fish.cyclic.app/OTP', { email: email }).then((res) => {
            OTP = res.data.value
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error)
        });

        let OTPValue = prompt(`1. Check the mail and enter the OTP \n2. Please don't refresh the page`);
        if (parseInt(OTPValue) === parseInt(OTP)) {
            await axios.post('https://embarrassed-scarf-fish.cyclic.app/reg', obj, { headers: { "Content-Type": "application/json" } }).then((res) => {
                alert(res.data)
            }).catch((error) => {
                console.log(error)
            });

            setName("")
            setEmail("")
            setPassword("")
        } else {
            alert("Wrong OTP")
        }

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

                    <div className='regImg'>
                        <img src={regImg} alt=""></img>
                    </div>

                    <div className={"reg-container"}>
                        <form onSubmit={handelData}>
                            <div className="reg-heading">Register</div>

                            <label className='reg-label'>Name :</label><br />
                            <input type="text" className='reg-input' value={name} onChange={(e) => { setName(e.target.value) }} required></input><br />

                            <label className='reg-label'>Email Address :</label><br />
                            <input type="email" className='reg-input' value={email} onChange={(e) => { setEmail(e.target.value) }} required></input><br />

                            <label className='reg-label'>Password :</label><br />
                            <input type="Password" className='reg-input' value={password} onChange={(e) => { setPassword(e.target.value) }} required></input><br />

                            {isLoading && <div><button className='reg-submit'>Please Wait...</button><br /></div>}
                            {!isLoading && (
                             <div>
                            <input type="Submit" className='reg-submit' value="Register"></input><br />
                            </div>

                            )}

                            <Link to="/login" className='reg-link'>Login to Nex ChatGPT</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration