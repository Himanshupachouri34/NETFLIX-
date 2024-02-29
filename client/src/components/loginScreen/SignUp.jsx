import React, { useState } from 'react'
import "./signup.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper'
import { authentication } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault();


        createUserWithEmailAndPassword(authentication, email, password)
            .then((res) => {
                console.log(`user signed up`, res);
                navigate("/plans")
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const signIn = (e) => {
        e.preventDefault();


        signInWithEmailAndPassword(authentication, email, password)
            .then((res) => {
                console.log(`user signed up`, res);
                navigate("/")
            })
            .catch((err) => {
                alert(err.message)
            })
    }



    return (
        <>
            
                <div className="logo">
                    <img
                        src="https://logohistory.net/wp-content/uploads/2023/05/Netflix-Logo.png" alt=""
                    />
                </div>
                
                <div className='container'>

                    <ContentWrapper>

                        <form action="">
                            <h1>Sign In</h1>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input'
                                type="text"
                                placeholder='Email' />

                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='input'
                                type="password"
                                placeholder='Password' />

                            <button onClick={signIn}>Sign In</button>
                            <h4>
                                <span className='signupScreen_gray'> New To Netflix? </span>
                                <span className='signupScreen_link' onClick={register}>Sign Up now. </span>
                            </h4>


                        </form>
                    </ContentWrapper>
                </div>
            
        </>
    )
}

export default SignUp