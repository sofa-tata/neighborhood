import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignInClass from '../authentication/SignInClass';
import PleaseSignIn from '../authentication/AskForSignIn';
import ProfilePage from '../profile/ProfilePage';
import PasswordResetClass from '../authentication/PasswordResetClass';
import SignUpForProvider from '../authentication/SignUpForProvider';
import ChooseUserType from '../authentication/ChooseUserType';
import SignUpClass from '../authentication/SignUpClass';
import ListPage from './ListPage';
import ProfilePageForProviders from '../profile/ProfilePageForProviders';
import { slide as Menu} from 'react-burger-menu';
import ProviderCard from '../profile/ProviderCard';



class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }
    toggleMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    render() {
        return (
            <Router>
                <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="/images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="/images/cross_btn.png" alt="Close" /> }
                    isOpen={ this.state.menuOpen }
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signUp" component={SignUpClass} />
                    <Route path="/signUpForProvider" component={SignUpForProvider} />
                    <Route path="/signIn" component={SignInClass} />
                    <Route path="/pleaseSignIn" component={PleaseSignIn} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/passwordReset" component={PasswordResetClass} />
                    <Route path="/chooseUserType" component={ChooseUserType} />
                    <Route path="/listPage" component={ListPage} />
                    <Route path="/profilePageForProviders/:id" component={ProfilePageForProviders} />
                    <Route path="/providerCard" component={ProviderCard} />
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
