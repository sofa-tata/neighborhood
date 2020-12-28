import React from 'react';
import '../passwordreset.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';


class PasswordResetClass extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            emailHasBeenSent: false,
            error: null
        }
    }

    onChangeHandler = event => {
       const { name, value } = event.currentTarget;
       if (name === "userEmail") {
           this.setState({ email: value});
       }
    }

    sendResetEmail = event => {
        // event.preventDefault();
        auth
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
            // event.preventDefault();
            // this.setState({ emailHasBeenSent: true });
            // setTimeout(() => this.setState({ emailHasBeenSent: false }), 5000);
            console.log("ök")
        })
        .catch(() => {
            // event.preventDefault();
            // this.setState({ error: "Error resetting password!"});
            console.log('error: ')
        })
        // event.preventDefault();
    }
    render() {

        return (
            <div className="reset_wrapper">
                <div className="reset_content">
                    <h3>Reset your password:</h3>
                    <div className="reset_form">
                    {/* <form action="" className="reset_form"> */}
                        {this.state.emailHasBeenSent && (
                            <div>An email has been sent to you!</div>
                        )}
                        {this.state.error !== null && (
                            <div>{this.state.error}</div>
                        )}
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={this.state.email}
                            placeholder="Input your email"
                            onChange={this.onChangeHandler}
                            className="reset_input"
                        />
                        <button className="reset_btn" onClick={() => {this.sendResetEmail()}}>Send me a reset link</button>
                    {/* </form> */}
                    </div>
                    <Link to="/signIn" className="reset_back">Back to Sign In page</Link>                    
                </div>
            </div>
        )
    }
}


export default PasswordResetClass;