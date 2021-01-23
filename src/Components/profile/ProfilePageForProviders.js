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
            id: ""
        }
    }


    componentDidMount = () => {
        const url = window.location.href
        let id = url.substring(url.lastIndexOf(":") + 1, url.length);
        const email = sessionstorage.getItem("user")
        this.getProvider(id, email)
    }

    getProvider = async (id, email) => {
        let user;        
        if (id.includes("dogwalker")) {
            console.log('if dogwalker')
            user = await this.props.firebase.getDogwalkerByEmail(email)
        } else if (id.includes("babysitter")) {
            console.log('if babysitter')
            user = await this.props.firebase.getBabysitterByEmail(email)
        }
        console.log('getProvider user', user)
        if (user !== undefined){
            this.setState({ name: user.displayName, email: user.email,
            location: user.location, service: user.service })
        }
    }

    signOut=() => {
        sessionstorage.removeItem("user")
        this.props.firebase.doSignOut()
        window.location.href = "/signIn"
    }

    render() {
        const { name, service, email, location } = this.state
        return (
            <div className="pp_wrapper">

                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">

                    <img src="/images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{name}</h3>
                    <h5 className="provider-of">{service}</h5>
                    <h4 className="pp_email">{email}</h4>
                    <h4 className="pp_email">{location}</h4>

                </div>

            </div>
        )
    }

}

export default compose(withFirebase)(ProfilePageForProviders);