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

    // TRYING THEN AND CATCH:

    // createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    //     event.preventDefault();
    //     const {user} = await auth.createUserWithEmailAndPassword(email, password)
    //     generateUserDocument(user, this.state.displayName)
    //     .then(() => window.location.href = '/profilePage')
    //     .catch(error => {
    //         this.setState({error: 'Error Signing up with email and password'})
    //     })        
    // }

    createUserWithEmailAndPasswordHandler = async () => {
        const { displayName, location, email, password } = this.state

        //new 

        // let error = await this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)

        // if (error === null) {

//////////////////////////////////////////////////////////////////////////////

            const { user } = await this.props.firebase.doCreateUserWithEmailAndPassword(email, password);
            console.log('then user', user)
            const providerData = {
                uid: user.uid,
                displayName: displayName,
                email: email,
                location: location,
                service: null

            }
            
            await this.props.firebase.generateUserDocument(providerData)
            sessionstorage.setItem("email", email)
            console.log('sessionstorage.setItem', email)
            console.log("session get:", sessionstorage.getItem("email"))
            console.log('this.state.email', email)
            window.location.href = '/profilePage';
////////////////////////////////////////////////////////////////////////////

            // this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
            // .then(async user => {
            //     console.log('then user', user)
            //     if (user !== undefined) {
            //         sessionstorage.setItem("email", email)
            //     let userData = {
            //         uid: user.uid,
            //         displayName: displayName,
            //         email: email,
            //         location: location,
            //         service: null,
            //         price: null
            //     }
            //     await this.props.firebase.generateUserDocument(userData);
            //     window.location.href = '/profilePage'
            //     } else {
            //         // alert("something went wrong... try again")
            //     }
            // })
            

///////////////////////////////////////////////////////////////////////////////





            // .catch(err=>{
            // })
        // } else {
        //     alert(error);
        // }

        //old

        // try {
        //     const {user} = await this.props.firebase.doCreateUserWithEmailAndPassword(email, password);

            
        //     let u = {
        //         uid: user.uid,
        //         displayName: this.state.displayName,
        //         email: this.state.email,
        //         location: this.state.location,
        //         service: null,
        //         price: null
        //     }
        //     this.props.firebase.generateUserDocument(u);
        // }
        // catch(error) {
        //     this.setState({error: 'Error Signing up with email and password'});
        // }

        
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