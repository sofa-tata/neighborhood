import React from 'react';
import '../signin.css';
// import Firebase from "../firebase";
import { withFirebase } from '../firebase';
import { slide as Menu} from 'react-burger-menu';
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
            console.log('user', user)
            if (user.service === null) {
                window.location.href = "/profilePage"
            } else {
                window.location.href = "/profilePageForDW"
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
        console.log(address)
    }

    render() {
        return (

            <div className="signin_wrapper">
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
                {/* <img src="images/hamburger_menu.png" alt="Menu" className="signin_hamburger_menu"/> */}
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
                    <button className="signin_button" onClick = {(event) => {this.signInWithEmailAndPasswordHandler(event, this.email, this.password)}}>Sign In</button>
                    {/* <p>OR</p>
                    <button className="signin_button google_icon">Sign In with Google</button> */}
                    <div className="newacc_div">
                        <p onClick={() => this.clickCell("/chooseUserType")}>Create an account</p>
                    </div>
                </div>
            </div>
        )
    }
}

// export default SignInClass;
export default compose(withFirebase)(SignInClass);