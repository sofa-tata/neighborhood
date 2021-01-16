import React from 'react';
import '../signup.css';
// import Firebase from "../firebase";
import { slide as Menu} from 'react-burger-menu';
import { withFirebase } from '../firebase';
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

    createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        console.log('createUserWithEmailAndPasswordHandler')
        event.preventDefault();

        // let error = await this.props.firebase.doPasswordReset(this.state.email)
        // console.log('error', error)

        // if (error === null) {
        //     const {user} = await this.props.firebase.doCreateUserWithEmailAndPassword(email, password);

        //     let u = {
        //         uid: user.uid,
        //         displayName: this.state.displayName,
        //         email: this.state.email,
        //         location: this.state.location,
        //         service: null,
        //         price: null
        //     }
        //     await this.props.firebase.generateUserDocument(u);
        // } else {
        //     this.setState({ error: error, emailHasBeenSent: false});
        // }
        try {
            const {user} = await this.props.firebase.doCreateUserWithEmailAndPassword(email, password);

            
            let u = {
                uid: user.uid,
                displayName: this.state.displayName,
                email: this.state.email,
                location: this.state.location,
                service: null,
                price: null
            }
            await this.props.firebase.generateUserDocument(u);
        }
        catch(error) {
            this.setState({error: 'Error Signing up with email and password'});
        }

        

        // this.setState({email: ""});
        // this.setState({password: ""});
        // this.setState({displayName: ""});
        sessionstorage.setItem("user", this.state.email)
        window.location.href = '/profilePage'
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
        const cities = csc.getCitiesOfCountry("IL");
        return (
            <div className="signup_wrapper">
                {/* <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="/images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="/images/cross_btn.png" alt="Close" /> }
                    className="react_menu"
                    isOpen={ this.state.menuOpen }
                    // onClose={ this.handleOnClose }
                    customOnKeyDown={this.toggleMenu}
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu> */}
                {/* <img src="/images/hamburger_menu.png" alt="Menu" className="signup_hamburger_menu"/> */}
                <div className="signup_content">

                    <select
                    name="location"  
                    id="location" 
                    className="signup_input location" 
                    onChange = {(event) => this.onChangeHandler(event)}
                    value={this.state.location}
                    >
                        <option value="">Choose your location</option>
                        {cities.map((city,i) => <option id="city" key={i} value={city.value}>{city.name}</option>)}
                    </select>

                    <input type="text"
                    name="displayName" 
                    value={this.state.displayName} 
                    id="displayName" 
                    placeholder="Name" 
                    className="signup_input name" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="email"
                    name="userEmail" 
                    value={this.state.email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signup_input email" 
                    onChange = {(event) => this.onChangeHandler(event)} />

                    <input type="password"
                    name="userPassword"
                    value={this.state.password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signup_input password"
                    onChange = {(event) => this.onChangeHandler(event)} />


                    <button className="signup_button" onClick={event => {
                    this.createUserWithEmailAndPasswordHandler(event, this.state.email, this.state.password);
                    }}>Sign Up</button>
                    {/* <p>OR</p>
                    <button className="signup_button google_icon">Sign in with Google</button> */}
                    <div className="exist-acc-div">
                        <p onClick={() => this.goToSignInPage()}>Sign in to an existing account</p>
                    </div>
                </div>
            </div>
        )
    }
}

// export default SignUpClass;
export default compose(withFirebase)(SignUpClass);