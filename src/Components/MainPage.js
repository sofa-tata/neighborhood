import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import DogWalkersPage from './DogWalkersPage';
import Chat from './Chat';
import SignInClass from './SignInClass';
import PleaseSignIn from './AskForSignIn';
import ProfilePage from './ProfilePage';
import PasswordResetClass from './PasswordResetClass';
import SignUpForDW from './SignUpForDW';
import ChooseUserType from './ChooseUserType';
import SignUpClass from './SignUpClass';
import ProfilePageForDW from './ProfilePageForDW';
import BabysittersPage from './BabysittersPage';
import ProfilePageForBS from './ProfilePageForBS';
import ListPage from './ListPage';
import { slide as Menu} from 'react-burger-menu';



class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }
    toggleMenu = () => {
        console.log("1. toggleMenu -this.state.menuOpen: ", this.state.menuOpen)
        this.setState({menuOpen: !this.state.menuOpen}, () => {
            console.log("2. toggleMenu -this.state.menuOpen: ",this.state.menuOpen)
        })
    }

    render() {
        return (
            <Router>
                <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="/images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="/images/cross_btn.png" alt="Close" /> }
                    // className="react_menu"
                    isOpen={ this.state.menuOpen }
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/dogwalkerspage" component={DogWalkersPage} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/signUp" component={SignUpClass} />
                    <Route path="/signUpForDogWalker" component={SignUpForDW} />
                    <Route path="/signIn" component={SignInClass} />
                    <Route path="/pleaseSignIn" component={PleaseSignIn} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/profilePageForDW" component={ProfilePageForDW} />
                    <Route path="/profilePageForBS" component={ProfilePageForBS} />
                    <Route path="/passwordReset" component={PasswordResetClass} />
                    <Route path="/chooseUserType" component={ChooseUserType} />
                    <Route path="/babysitterspage" component={BabysittersPage} />
                    <Route path="/listPage" component={ListPage} />
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
