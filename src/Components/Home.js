import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';
import {  generateDogWalkerDocument } from '../firebase';

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isFindNowButtonClicked: false,
            menuOpen: false
        }
    }
  
    componentDidMount = () => {
        //generate 1 dog walker

        let dogWalker =  { 
            id: 0,
            name: "Gevin Belson",
            price: "from $5",
            rating: 3,
            distance: '0.3km'
         }
         
         generateDogWalkerDocument(dogWalker)

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
        console.log("1. toggleMenu -this.state.menuOpen: ",this.state.menuOpen)
        this.setState({menuOpen: !this.state.menuOpen},()=>{

            console.log("2. toggleMenu -this.state.menuOpen: ",this.state.menuOpen)
        })
      }
      handleOnClose=()=>{
          console.log("handleOnClose")
        this.setState({
            menuOpen:false
        })
      }
    render() {
        console.log("this.state.menuOpen:",this.state.menuOpen)

        return (
                <div className="wrapper">
                    {/* <img src="images/hamburger_menu.png" alt="menu" className="hamburger_menu" onClick={() => this.toggleMenu}/> */}
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
                        <a id="contact" className="menu-item" href="/signUp">SIGN UP</a>
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