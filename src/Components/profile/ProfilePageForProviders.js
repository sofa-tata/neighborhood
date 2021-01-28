import React from 'react';
import './ProfilePage.css';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';


class ProfilePageForProviders extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            location: null,
            service: null,
            about: "",
            id: ""
        }
    }


    componentDidMount = async () => {
        const email = sessionstorage.getItem("email")
        let service = await this.getProviderService(email)
        this.getProvider(service, email)
    }

    getProvider = async (service, email) => {
        let user;
        if (service !== null) {
            if (service.includes("dogwalker")) {
                user = await this.props.firebase.getDogwalkerByEmail(email)
            } else if (service.includes("babysitter")) {
                user = await this.props.firebase.getBabysitterByEmail(email)
            }
            if (user !== undefined){
                this.setState({ name: user.displayName, email: user.email,
                location: user.location, service: user.service, about: user.about })
            }
        } else {
            alert('Error!')
        }
    }

    getProviderService = async (email) => {
        let user = await this.props.firebase.getUserByEmail(email)
        return user.service
    }

    signOut= async() =>{
        sessionstorage.removeItem("email")
        let error = await this.props.firebase.doSignOut()
        if (error === null) {
            window.location.href = "/signIn"
        } else {
            alert(error)
        }    
    }

    render() {
        const { name, service, email, location, about } = this.state
        return (
            <div className="pp_wrapper">
                
                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">
                    
                    <img src="/images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{name}</h3>
                    <h5 className="provider-of">{service}</h5>
                    <h4 className="pp_email">{email}</h4>
                    <h4 className="pp_email">{location}</h4>
                    <h4 className="pp_about">{about}</h4>

                </div>

            </div>
        )
    }

}

export default compose(withFirebase)(ProfilePageForProviders);