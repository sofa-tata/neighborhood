import React from 'react';
import '../overlaymenu.css';

class OverlayMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    clickCell = (address) => {
        window.location.href = address
    }

    render () {
        return (
            <div className="omenu_wrapper">
                <div className="omenu_content">
                    <h4 onClick={() => this.clickCell("/")}>HOME</h4>
                    <h4 onClick={() => this.clickCell("/")}>CHOOSE SERVICE</h4>
                    <h4 onClick={() => this.clickCell("/signIn")}>SIGN IN</h4>
                    <h4 onClick={() => this.clickCell("/signUp")}>SIGN UP</h4>
                </div>

            </div>
        )
    }
}

export default OverlayMenu;