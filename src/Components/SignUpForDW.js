import React from 'react';
import { auth, generateDogWalkerDocument } from '../firebase';
import dogWalkersList from '../DogWalkersList';

class SignUpForDW extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            displayName: "",
            error: null
        }
    }

    createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            const {user} = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
            generateDogWalkerDocument(user, this.state.displayName);
        }
        catch(error) {
            this.setState({ error: 'Error Signing up with email and password'});
        }

        this.setState({ email: ""});
        this.setState({ password: ""});
        this.setState({ displayName: ""});
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    
    // onChangeHandler = (event) => {
    //     const { name, value } = event.currentTarget;
    //     if (name === "userEmail") {
    //         this.setState({
    //             email: value
    //         })
    //     } else if (name === "userPassword") {
    //         this.setState({
    //             password: value
    //         })
    //     } else if (name === "displayName") {
    //         this.setState({
    //             displayName: value
    //         })
    //     }
    // }
    clickCell= () => {
        window.location.href = "/signIn"
    }

    render() {
        const {email, password,displayName} = this.state
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
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />

                    <input type="email"
                    name="email" 
                    value={email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signup_input email" 
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />

                    <input type="password"
                    name="password"
                    value={password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signup_input password"
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />


                    <button className="signup_button" onClick={event => {
                    this.createUserWithEmailAndPasswordHandler(event, email, password);
                    }}>Sign Up</button>
                    <p>OR</p>
                    <button className="signup_button google_icon">Sign in with Google</button>
                    <div className="newacc_div">
                        <p onClick={() => this.clickCell()}>Sign in to an existing account</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpForDW;