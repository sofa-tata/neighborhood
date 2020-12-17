import React, { useState } from 'react';
import '../signup.css';
// import { Link } from 'react-router-dom';
import {auth, generateUserDocument} from "../firebase";


export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);


    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
        }
        catch(error) {
            setError('Error Signing up with email and password');
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        // console.log("name\n", name )
        // console.log("name === displayName",(name === "displayName"))
        if (name === "userEmail") {
            // console.log("if1")
            setEmail(value);
        } else if (name === "userPassword") {
            // console.log("if2")
            setPassword(value);
        } else if (name === "displayName") {
            // console.log("if3")
            setDisplayName(value);
        }
    }

    const clickCell= () => {
        window.location.href = "/signIn"
    }

    return (
        <div className="signup_wrapper">
            <img src="images/hamburger_menu.png" alt="Menu" className="signup_hamburger_menu"/>
            <div className="signup_content">

            <input type="text"
                 name="displayName" 
                 value={displayName} 
                 id="displayName" 
                 placeholder="Name" 
                 className="signup_input name" 
                 onChange = {(event) => onChangeHandler(event)} />

                <input type="email"
                 name="userEmail" 
                 value={email} 
                 id="userEmail" 
                 placeholder="Email" 
                 className="signup_input email" 
                 onChange = {(event) => onChangeHandler(event)} />

                <input type="password"
                 name="userPassword"
                 value={password}
                 id="userPassword"
                 placeholder="Password" 
                 className="signup_input password"
                 onChange = {(event) => onChangeHandler(event)} />


                <button className="signup_button" onClick={event => {
                createUserWithEmailAndPasswordHandler(event, email, password);
                }}>Sign Up</button>
                <p>OR</p>
                <button className="signup_button google_icon">Sign in with Google</button>
                <div className="newacc_div">
                    <p onClick={() => clickCell()}>Sign in to an existing account</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;