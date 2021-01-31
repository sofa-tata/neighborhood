import React from 'react';
import './SignUp.css';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import csc from 'country-state-city';
import sessionstorage from 'sessionstorage';


class SignUpClass extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            displayName: "",
            location: "",
            error: null
        }
    }


    createUserWithEmailAndPasswordHandler = async () => {
        const { displayName, location, email, password } = this.state
        this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
        .then(async answer => {
            console.log('then answer', answer)
            if(answer !== undefined) {
                if(answer.message === undefined) {
                    if(answer.user !== undefined) {
                        if(answer.user.uid !== undefined) {
                            const providerData = {
                                uid: answer.user.uid,
                                displayName: displayName,
                                email: email,
                                location: location,
                                service: null
                            }
                            await this.props.firebase.generateUserDocument(providerData)
                            sessionstorage.setItem("email", email)
                            window.location.href = '/profilePage'
                        }
                    }
                } else {
                    alert(answer.message)
                }
            }
        })

    }                   
    

    onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            this.setState({email: value})
        } else if (name === "userPassword") {
            this.setState({password: value})
        } else if (name === "displayName") {
            this.setState({displayName: value})
        } else if (name === "location") {
            this.setState( {location: value })
        }
    }

    goToSignInPage = () => {
        window.location.href = "/signIn"
    }

    render() {
        const { email, location, displayName, password } = this.state
        const cities = csc.getCitiesOfCountry("IL");
        return (
            <div className="signup_wrapper">
                <div className="signup_content">

                    <select
                    name="location"  
                    id="location" 
                    className="signup_input location select" 
                    onChange = {(event) => this.onChangeHandler(event)}
                    value={location}
                    >
                        <option value="">Choose your location</option>
                        {cities.map((city,i) => 
                        <option id="city" key={i} value={city.value}>{city.name}</option>)}
                    </select>

                    <input type="text"
                    name="displayName" 
                    value={displayName} 
                    id="displayName" 
                    placeholder="Name" 
                    className="signup_input name" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="email"
                    name="userEmail" 
                    value={email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signup_input email" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="password"
                    name="userPassword"
                    value={password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signup_input password"
                    onChange = {(event) => this.onChangeHandler(event)} />


                    <button className="signup_button" onClick={ 
                    this.createUserWithEmailAndPasswordHandler}>Sign Up</button>
                    <div className="exist-acc-div">
                        <p onClick={() => this.goToSignInPage()}>Sign in to an existing account</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(withFirebase)(SignUpClass);