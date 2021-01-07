import React from 'react';
// import Firebase from '../firebase';
import { slide as Menu} from 'react-burger-menu';
import '../signupfordw.css';
import { Slider } from '@material-ui/core';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';

class SignUpForDW extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            displayName: "",
            error: null,
            service: null,
            price: 5,
            location: null,
            rating: 0
        }
    }

    componentDidMount = () => {
        console.log('service: ', this.state.service)
    }

    createNewDogwalkerWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try {
            if (this.state.service === null) {
                this.setState({ error: 'You should choose one of the available services!'})
                alert('You should choose one of the available services!')
            } else if (this.state.service === "dogwalker") {
                const{user} = await this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password);
                console.log('createNewDogwalkerWithEmailAndPasswordHandler - user', user)
                const dogwalker = {
                    uid: user.uid,
                    displayName: this.state.displayName,
                    email: this.state.email,
                    price: this.state.price,
                    service: this.state.service,
                    rating: 0

                }
                console.log('createNewDogwalkerWithEmailAndPasswordHandler - dogwalker', dogwalker)
                this.props.firebase.generateDogWalkerDocument(dogwalker);
                this.props.firebase.generateUserDocument(dogwalker)
                window.location.href = '/profilePageForDW';
            } else {
                const {user} = await this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password);
                console.log('createNewDogwalkerWithEmailAndPasswordHandler - bs-user', user)
                const babysitter = {
                    uid: user.uid,
                    displayName: this.state.displayName,
                    email: this.state.email,
                    price: this.state.price,
                    service: this.state.service,
                    rating: 0

                }
                console.log('createNewDogwalkerWithEmailAndPasswordHandler - babysitter', babysitter)
                this.props.firebase.generateBabysitterDocument(babysitter);
                this.props.firebase.generateUserDocument(babysitter)
                window.location.href = '/profilePageForDW';
            }
        }
        catch(error) {
            this.setState({ error: 'Error Signing up with email and password'});
        }

        // this.setState({ email: ""});
        // this.setState({ password: ""});
        // this.setState({ displayName: ""});
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log("state name ", event.target.name)
        console.log("state value ", event.target.value)
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

    handleChange = (event, newPrice) => {
        this.setState({ price: newPrice })
        console.log('new price: ', newPrice)
    }

    render() {
        const {email, password, displayName, price, service } = this.state
        const mark = [
            {
                value: 10,
                label: ''
            }
        ]
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

                    <div className="label-div" onChange={this.onChange} value={service} name="service">
                        <div className="label-dw" style={{opacity: this.state.service==="dogwalker"?'1':'0.8'}}>
                            <input type="radio" id="dogwalker" name="service" value="dogwalker" className="input-radio-dw" />
                            <label htmlFor="dogwalker">Dog Walker</label><br />
                        </div>

                        <div className="label-bs" style={{opacity: this.state.service==="babysitter"?'1':'0.8'}}>
                            <input type="radio" id="babysitter" name="service" value="babysitter" className="input-radio-bs"/>
                            <label htmlFor="babysitter">Babysitter</label>
                        </div>
                    </div>

                    <p className="choose-the-price-p">What is your price for 1 hour of work? (in USD)</p>
                    <div className="price-slider">
                        <Slider
                        min={5}
                        max={15}
                        defaultValue={10}
                        value={price}
                        onChange={this.handleChange}
                        marks={mark}
                        valueLabelDisplay="auto"                        
                        />
                    </div>
                    <p className="your-price">Your price: <span id="yourPrice">{'$'}{price}</span></p>                    

                    <button className="signupDW_button" onClick={event => {
                    this.createNewDogwalkerWithEmailAndPasswordHandler(event, email, password);
                    }}>Sign Up</button>
                    {/* <p>OR</p>
                    <button className="signupDW_button google_icon">Sign in with Google</button> */}
                    <div className="exist-acc-divDW">
                        <p onClick={() => this.clickCell("/signIn")}>Sign in to an existing account</p>
                    </div>
                </div>
            </div>
        )
    }
}

// export default SignUpForDW;
export default compose(withFirebase)(SignUpForDW);