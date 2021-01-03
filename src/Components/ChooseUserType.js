import React from 'react';
import '../chooseUserType.css';

class ChooseUserType extends React.Component {

    clickCell = (address) => {
        window.location.href = address
    }

    render() {
        return (
            <div className="choose_wrapper">
                <div className="seller_btn" onClick={() => this.clickCell("/signUpForDogWalker")}>
                    <p>I'M A SELLER</p>
                    <p id="description">I want to provide a service</p>
                </div>
                <div className="buyer_btn"  onClick={() => this.clickCell("/signUp")}>
                    <p>I'M A BUYER</p>
                    <p id="description">I want to find a service</p>
                </div>
            </div>

        )
    }
}

export default ChooseUserType;