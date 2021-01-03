import React from 'react';
import '../profilepage.css';

class ProfilePageForDW extends React.Component {

    clickCell=() =>{
        window.location.href = "/signIn"
    }
    render() {
        return (
            <div className="pp_wrapper">
                <img src="images/hamburger_menu.png" alt="Menu" className="pp_hamburger_menu"/>
                <h5 className="signout_btn" onClick={() => this.clickCell()}>Sign Out</h5>
                <div className="pp_content">
                    <img src="images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">Sofiia</h3>
                    <h5 className="provider-of">(dog walker)</h5>
                    <h4 className="pp_email">sophie.tatarinova@gmail.com</h4>
                </div>
            </div>
        )
    }

}

export default ProfilePageForDW;