import React, { useState } from 'react';
import '../passwordreset.css';


const PasswordReset = () => {    
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSet] = useState(false);
    const [error, setError] = useState(null);


    const onChangeHandler = (event) => {
       const { name, value } = event.currentTarget;
       if (name === "userEmail") {
           setEmail(value);
       }
    }

    const setResetEmail = (event) => {
        event.preventDefault();
    }

    return (
        <div className="reset_wrapper">
            <div className="reset_content">
                <h3>Reset your password</h3>
            </div>
        </div>
    )
}

export default PasswordReset;