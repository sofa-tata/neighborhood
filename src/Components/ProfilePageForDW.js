import React from 'react';
import '../profilepage.css';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
class ProfilePageForDW extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            service: null
        }
    }


    componentDidMount = async () => {
        console.log('componentDidMount')
        const email = sessionstorage.getItem("user")
        console.log('email ', email)
        let user = await this.props.firebase.getDogwalkerByEmail(email)
        console.log('user', user)
        this.setState({ name: user.displayName, email: user.email, service: user.service })
    }

    signOut=() =>{
        sessionstorage.removeItem("user")
        this.props.firebase.doSignOut()
        window.location.href = "/signIn"
    }

    render() {
        return (
            <div className="pp_wrapper">
                <img src="images/hamburger_menu.png" alt="Menu" className="pp_hamburger_menu"/>
                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">
                    <img src="images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{this.state.name}</h3>
                    <h5 className="provider-of">{this.state.service}</h5>
                    <h4 className="pp_email">{this.state.email}</h4>
                </div>
            </div>
        )
    }

}

// export default ProfilePageForDW;
export default compose(withFirebase)(ProfilePageForDW);