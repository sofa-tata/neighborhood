import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isFindNowButtonClicked: false,
            menuOpen: false
        }
    }
  
    getMainPageDisplay = () => {

        if (!this.state.isFindNowButtonClicked) {
            return (  
            <div className="btn-div">
                <p className="description">the best way to find the best service</p>
                <button className="findnow_button" type="button" onClick={() => this.setState({isFindNowButtonClicked: true})}>FIND NOW</button>
            </div>
            )
            

        } else {
            return (
            <div className="search-div">
                <p>Which one do you need?</p>
                <div className="services">
                <Link to="/dogwalkerspage" className="link_to_list"><div className="service services_dw">Dog Walker</div></Link>
                <Link to="/dogwalkerspage" className="link_to_list"><div className="service services_bs">Babysitter</div></Link>
                </div>
            </div>
            )
        }
    }

    toggleMenu () {
        this.setState(state => ({menuOpen: !state.menuOpen}))
      }

    render() {
        

        return (
                <div className="wrapper">
                    {/* <img src="images/hamburger_menu.png" alt="menu" className="hamburger_menu" onClick={() => this.toggleMenu}/> */}
                    <Menu 
                    right 
                    customBurgerIcon={ <img src="images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="images/cross_btn.png" alt="Close" /> }
                    >
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="about" className="menu-item" href="/signIn">Sign In</a>
                        <a id="contact" className="menu-item" href="/signUp">Sign Up</a>
                    </Menu>
                    
                    <div className="content">
                            <h1>neighborhood</h1>
                            <div>{this.getMainPageDisplay()}</div>
                    </div>                 
            </div>
        );
    }
}

export default Home;