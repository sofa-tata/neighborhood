import React from 'react';
import { auth, generateDogWalkerDocument } from '../firebase';
import { slide as Menu} from 'react-burger-menu';
import '../signupfordw.css';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { Slider } from '@material-ui/core';

class SignUpForDW extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            displayName: "",
            error: null,
            service: ""
        }
    }

    //for signup for providers
    // 1. alert if none of services is chosen
    //2. do if else: if dw - keep generateDogWalkerDocument, else - create function for babysitter and put it here
    // 

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
    clickCell= (address) => {
        window.location.href = address
    }

    render() {
        const {email, password, displayName} = this.state
        return (
            <div className="signupDW_wrapper">
                <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="images/cross_btn.png" alt="Close" /> }
                    className="react_menu"
                    isOpen={ this.state.menuOpen }
                    // onClose={ this.handleOnClose }
                    customOnKeyDown={this.toggleMenu}
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu>
                {/* <img src="images/hamburger_menu.png" alt="Menu" className="signup_hamburger_menu"/> */}
                <div className="signupDW_content">

                    <input type="text"
                    name="displayName" 
                    value={displayName} 
                    id="displayName" 
                    placeholder="Name" 
                    className="signupDW_input name" 
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />

                    <input type="email"
                    name="email" 
                    value={email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signupDW_input email" 
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />

                    <input type="password"
                    name="password"
                    value={password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signupDW_input DWpassword"
                    onChange={this.onChange}
                    // onChange = {(event) => this.onChangeHandler(event)}
                     />

                    <p className="choose-the-service-p">Choose the service you will provide with: </p>

                    <div className="label-div">
                        <div className="label-dw">
                            <input type="radio" id="dogwalker" name="service" value="dogwalker" className="input-radio-dw" />
                            <label htmlFor="dogwalker">Dog Walker</label><br />
                        </div>

                        <div className="label-bs">
                            <input type="radio" id="babysitter" name="service" value="babysitter" className="input-radio-bs"/>
                            <label htmlFor="babysitter">Babysitter</label>
                        </div>
                    </div>

                    <p className="choose-the-price-p">What is your price for 1 hour of work (in USD)? </p>
                    <input type="range" id="priceSlider" name="price" min="5" max="15" className="price-slider"></input>
                    <p>Your price: <span id="yourPrice"></span></p>
                    
                        {/* <Slider
                        min={5}
                        max={15}
                        marks={{5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12:'12', 13: '13', 14: '14', 15: '15'}}
                        className="price-slider"
                        trackStyle={{width: '20%'}}
                        /> */}
                    

                    <button className="signupDW_button" onClick={event => {
                    this.createUserWithEmailAndPasswordHandler(event, email, password);
                    }}>Sign Up</button>
                    {/* <p>OR</p>
                    <button className="signupDW_button google_icon">Sign in with Google</button> */}
                    <div className="newacc_div">
                        <p onClick={() => this.clickCell("/signIn")}>Sign in to an existing account</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpForDW;