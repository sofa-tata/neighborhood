import React, { useState } from 'react';
import '../signin.css';
// import { Link } from 'react-router-dom';
import { auth } from "../firebase";


const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            window.location.href = "/profilePage"
          }).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
          })
    }


    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        }

        else if (name === "userPassword") {
            setPassword(value);
        }
    }

    const clickCell= (address) => {
        window.location.href = address
        console.log(address)
    }

    return (

        <div className="signin_wrapper">
            <img src="images/hamburger_menu.png" alt="Menu" className="signin_hamburger_menu"/>
            <div className="signin_content">
                <input type="email"
                 name="userEmail" 
                 value={email} 
                 id="userEmail" 
                 placeholder="Email" 
                 className="signin_input email" 
                 onChange = {(event) => onChangeHandler(event)} />

                <input type="password"
                 name="userPassword"
                 value={password}
                 id="userPassword"
                 placeholder="Password" 
                 className="signin_input password"
                 onChange = {(event) => onChangeHandler(event)} />

                <p className="forgot_password" onClick={() => clickCell("/passwordReset")}>Forgot password?</p>
                <button className="signin_button" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Sign In</button>
                <p>OR</p>
                <button className="signin_button google_icon">Sign In with Google</button>
                <div className="newacc_div">
                    <p onClick={() => clickCell("/signUp")}>Create an account</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;