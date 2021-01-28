import React from 'react';
import './SignIn.css';
import { withFirebase } from '../../firebase';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';


class SignInClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: null
        }
    }

    signInWithEmailAndPasswordHandler = async event => {
        const { email, password } = this.state
        event.preventDefault();
        sessionstorage.setItem("email", email) 
        this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(async ans => {
            if(ans !== undefined) {
                if(ans.message === undefined) {
                    if(ans.user !== undefined) {
                        if(ans.user.email !== undefined) {
                            const user = await this.props.firebase.getUserByEmail(ans.user.email)
                            if (user.service === null) {
                                window.location.href = "/profilePage"
                            } else if (user.service === "dogwalker") {
                                window.location.href = "/profilePageForProviders/dogwalker"
                            } else {
                                window.location.href = "/profilePageForProviders/babysitter"
                            }
                        }
                    }
                } else {
                    alert(ans.message)
                }
            }
            
        }).catch(error => {
            this.setState({error: "Error signing in with password and email!"});
            alert(error)
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
        const { email, password } = this.state
        return (
            <div className="signin_wrapper">

                <div className="signin_content">

                    <input type="email"
                    name="userEmail" 
                    value={email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signin_input email" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="password"
                    name="userPassword"
                    value={password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signin_input password"
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <p className="forgot_password" onClick={() => 
                    this.clickCell("/passwordReset")}>Forgot password?</p>
                    <button className="signin_button" onClick = {this.signInWithEmailAndPasswordHandler}>Sign In</button>
                    <div className="newacc_div">
                        <p onClick={() => this.clickCell("/chooseUserType")}>Create an account</p>
                    </div>

                </div>

            </div>
        )
    }
}


export default compose(withFirebase)(SignInClass);