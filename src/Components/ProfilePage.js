import React from 'react';
import '../profilepage.css';

const ProfilePage = () => {

    const clickCell=() =>{
        window.location.href = "/signIn"
    }

    return (
        <div className="pp_wrapper">
            <img src="images/hamburger_menu.png" alt="Menu" className="pp_hamburger_menu"/>
            <h5 className="signout_btn" onClick={() => clickCell()}>Sign Out</h5>
            <div className="pp_content">
                <img src="images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                <h3 className="pp_name">Sofiia</h3>
                <h4 className="pp_email">sophie.tatarinova@gmail.com</h4>
            </div>
        </div>
    )

}

export default ProfilePage;