import React from 'react';
import './SignUpForProvider.css';
import { Slider } from '@material-ui/core';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import csc from 'country-state-city';
import sessionstorage from 'sessionstorage';

class SignUpForProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            displayName: "",
            error: null,
            service: null,
            price: 30,
            location: "",
            about: "",
            rating: 0
        }
    }


    createNewProviderWithEmailAndPasswordHandler = async () => {
        const { displayName, price, service, location, about, email, password } = this.state

            if (service === null) {

                alert('You should choose one of the available services!')
            } 
            if (location === "") {
                alert('Please, choose your location')
            } 
            else {
                const { user } = await this.props.firebase.doCreateUserWithEmailAndPassword(email, password);
                const providerData = {
                    uid: user.uid,
                    displayName: displayName,
                    email: email,
                    price: price,
                    service: service,
                    location: location,
                    about: about,
                    rating: 0

                }
                if (service === "dogwalker") {
                    await this.props.firebase.generateDogWalkerDocument(providerData);
                } else {
                    await this.props.firebase.generateBabysitterDocument(providerData);
                }
                await this.props.firebase.generateUserDocument(providerData)
                sessionstorage.setItem("email", this.state.email)
                console.log('sessionstorage.setItem', email)
                console.log("session get:", sessionstorage.getItem("email"))
                console.log('this.state.email', this.state.email)
                window.location.href = '/profilePageForProviders';
        
           
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
    clickCell= (address) => {
        window.location.href = address
    }

    handleChange = (event, newPrice) => {
        this.setState({ price: newPrice })
    }

    render() {
        const {email, password, displayName, price, service, about } = this.state
        const sliderMark = [
            {
                value: 50,
                label: ''
            }
        ]
        const cities = csc.getCitiesOfCountry("IL");
        return (
            <div className="signupDW_wrapper">

                <div className="signupDW_content">


                    <select
                    name="location"  
                    id="location" 
                    className="signupDW_input location selectFP" 
                    onChange={this.onChange}
                    defaultValue={""}
                    >
                        <option value="">Choose your location</option>
                        {cities.map((city, i) => 
                        <option id="city" key={i} value={city.value}>{city.name}</option>)}
                    </select>

                    <input type="text"
                    name="displayName" 
                    value={displayName} 
                    id="displayName" 
                    placeholder="Name" 
                    className="signupDW_input name" 
                    onChange={this.onChange}
                     />

                    <input type="email"
                    name="email" 
                    value={email} 
                    id="userEmail" 
                    placeholder="Email" 
                    className="signupDW_input email" 
                    onChange={this.onChange}
                     />

                    <input type="password"
                    name="password"
                    value={password}
                    id="userPassword"
                    placeholder="Password" 
                    className="signupDW_input DWpassword"
                    onChange={this.onChange}
                     />

                    <textarea id="about_provider"
                    name="about" 
                    value={about}
                    cols="70"
                    rows="5"
                    placeholder="Tell a little bit about yourself:"
                    onChange={this.onChange}
                    />

                    <p className="choose-the-service-p">Choose the service you will provide with: </p>

                    <div className="label-div" onChange={this.onChange} value={service} name="service">
                        <div className="label-dw" style={{opacity: this.state.service === "dogwalker" ? '1':'0.8'}}>
                            <input type="radio"
                            id="dogwalker"
                            name="service"
                            value="dogwalker"
                            className="input-radio-dw" />
                            <label htmlFor="dogwalker">Dog Walker</label><br />
                        </div>

                        <div className="label-bs" style={{opacity: this.state.service === "babysitter" ? '1' : '0.8'}}>
                            <input type="radio"
                            id="babysitter"
                            name="service" 
                            value="babysitter" 
                            className="input-radio-bs"/>
                            <label htmlFor="babysitter">Babysitter</label>
                        </div>
                    </div> 

                    <p className="choose-the-price-p">What is your price for 1 hour of work?</p>
                    <div className="price-slider">
                        <Slider
                        min={30}
                        max={100}
                        step={5}
                        defaultValue={50}
                        value={price}
                        onChange={this.handleChange}
                        marks={sliderMark}
                        valueLabelDisplay="auto"                        
                        />
                    </div>
                    <p className="your-price">Your price: <span id="yourPrice">{'₪'}{price}</span></p>
         

                    <button className="signupDW_button" onClick={
                    this.createNewProviderWithEmailAndPasswordHandler}>Sign Up</button>
                    <div className="exist-acc-divDW">
                        <p onClick={() => this.clickCell("/signIn")}>Sign in to an existing account</p>
                    </div>

                </div>

            </div>
        )
    }
}

export default compose(withFirebase)(SignUpForProvider);