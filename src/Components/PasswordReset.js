import React, { useState } from 'react';
import '../passwordreset.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';


const PasswordReset = () => {    
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);
//create class without hooks but with state

    const onChangeHandler = event => {
       const { name, value } = event.currentTarget;
       if (name === "userEmail") {
           setEmail(value);
       }
    }

    const sendResetEmail = event => {
        event.preventDefault();
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
            setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch(() => {
            setError("Error resetting password!");
            console.log('test')
        })
    }

    return (
        <div className="reset_wrapper">
            <div className="reset_content">
                <h3>Reset your password:</h3>
                <form action="" className="reset_form">
                    {emailHasBeenSent && (
                        <div>An email has been sent to you!</div>
                    )}
                    {error !== null && (
                        <div>{error}</div>
                    )}
                    <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={email}
                        placeholder="Input your email"
                        onChange={onChangeHandler}
                        className="reset_input"
                    />
                    <button className="reset_btn" onClick={() => {sendResetEmail()}}>Send me a reset link</button>
                </form>
                <Link to="/signIn" className="reset_back">Back to Sign In page</Link>                    
            </div>
        </div>
    )
}

export default PasswordReset;