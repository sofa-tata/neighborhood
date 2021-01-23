import React from 'react';
import './AskForSignIn.css';

class AskForSignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }
    clickCell= (address) =>{
        window.location.href = address
    }


    render() {
        return (
        <div className="askforsignin_wrapper">

                <div className="askforsignin_content">
                    <h1>To leave a message, please <u onClick={()=>{this.clickCell("/signIn")}}>sign in</u>.</h1>
                </div> 
                            
        </div>
        )
    }
}       


export default AskForSignIn;