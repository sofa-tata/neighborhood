import React from 'react';
import '../askforsignin.css';

class AskForSignIn extends React.Component {
    clickCell=() =>{
        window.location.href = "/signIn"
    }
    render() {
        return (
        <div className="askforsignin_wrapper">
                <img src="images/hamburger_menu.png" alt="menu" className="ask_hamburger_menu"/>
                <div className="askforsignin_content">
                    <h1>To leave a message, please <u onClick={()=>{this.clickCell()}}>sign in</u>.</h1>
                </div>         
                            
        </div>
        )
    }
}       


export default AskForSignIn;