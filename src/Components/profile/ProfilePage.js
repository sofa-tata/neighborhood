import React from 'react';
import './ProfilePage.css';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';

class ProfilePage extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            location: null
        }
    }

    componentDidMount = async () => {
        const email = sessionstorage.getItem("email")
        let user = await this.props.firebase.getUserByEmail(email)
        if (user !== null) {
            this.setState({ name: user.displayName, email: user.email, location: user.location })
        }
    }

    signOut= async() => {
        sessionstorage.removeItem("email")
        let error = await this.props.firebase.doSignOut()
        if (error === null) {
            window.location.href = "/signIn"
        } else {
            alert(error)
        }
        
    }
    
    render() {
        const { name, email, location } = this.state
        return (
            <div className="pp_wrapper">

                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">

                    <img src="/images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{name}</h3>
                    <h4 className="pp_email">{email}</h4>
                    <h4 className="pp_email">{location}</h4>

                </div>

            </div>
        )
    }

}

export default compose(withFirebase)(ProfilePage);