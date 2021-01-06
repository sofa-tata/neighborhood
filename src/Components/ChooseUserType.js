import React from 'react';
import '../chooseUserType.css';
import { slide as Menu} from 'react-burger-menu';

class ChooseUserType extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }

    clickCell = (address) => {
        window.location.href = address
    }

    toggleMenu = () => {
        console.log("1. toggleMenu - this.state.menuOpen: ", this.state.menuOpen)
        this.setState({menuOpen: !this.state.menuOpen}, () => {
            console.log("2. toggleMenu - this.state.menuOpen: ",this.state.menuOpen)
        })
    }

    handleOnClose = () => {
          console.log("handleOnClose")
        this.setState({
            menuOpen:false
        })
    }

    render() {
        return (
            <div className="choose_container">
                 <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="images/cross_btn.png" alt="Close" /> }
                    className="react_menu"
                    isOpen={ this.state.menuOpen }
                    // onClose={ this.handleOnClose }
                    customOnKeyDown={this.toggleMenu}
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu>
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
            </div>

        )
    }
}

export default ChooseUserType;