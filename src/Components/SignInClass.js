import React from 'react';
import './authentication/SignIn.css';
import { withFirebase } from '../firebase';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';


class SignInClass extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: null
        }
    }

    signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        sessionstorage.setItem("user", this.state.email)
        this.props.firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            if (user.service === null) {
                window.location.href = "/profilePage"
            } else if (user.service === "dogwalker") {
                window.location.href = "/profilePageForProviders/id:dogwalker"
            } else {
                window.location.href = "/profilePageForProviders/id:babysitter"
            }
            
          }).catch(error => {
            this.setState({error: "Error signing in with password and email!"});
            console.error("Error signing in with password and email", error);
          })
    }


    onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            this.setState({email: value})
        }

        else if (name === "userPassword") {
            this.setState({password: value})
        }
    }

    clickCell= (address) => {
        window.location.href = address
    }

    render() {
        return (

            <div className="signin_wrapper">

                <div className="signin_content">

                    <input type="email"
                    name="userEmail" 
                    value={this.state.email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signin_input email" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="password"
                    name="userPassword"
                    value={this.state.password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signin_input password"
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <p className="forgot_password" onClick={() => this.clickCell("/passwordReset")}>Forgot password?</p>
                    <button className="signin_button" onClick = {(event) =>
                    {this.signInWithEmailAndPasswordHandler(event, this.email, this.password)}}>Sign In</button>
                    <div className="newacc_div">
                        <p onClick={() => this.clickCell("/chooseUserType")}>Create an account</p>
                    </div>

                </div>

            </div>
        )
    }
}


export default compose(withFirebase)(SignInClass);