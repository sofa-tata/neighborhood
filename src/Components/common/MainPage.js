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
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';



class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    componentDidMount = () => {
        console.log('sessionstorage.getItem', sessionstorage.getItem('email'))
    }

    toggleMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    signOut=() =>{
        sessionstorage.removeItem("email")
        this.props.firebase.doSignOut()
        window.location.href = "/signIn"
    }

    render() {
        return (
            <Router>
                <Menu 
                    right 
                    // width = { window.innerWidth > 600 ?'30%' : '10%'}
                    width = {'30%'}
                    customBurgerIcon={ <img className="burger-icon-img" src="/images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="/images/cross_btn.png" alt="Close" /> }
                    isOpen={ this.state.menuOpen }
                    >
                        <a id="home" className="menu-item home-item" href="/open">SEARCH</a>
                        
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                        {sessionstorage.getItem('email') === null ?
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        :
                        <p className="menu-item" onClick={this.signOut}>SIGN OUT</p>
                        }
                    </Menu>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/open" exact component={Home} />
                    <Route path="/signUp" component={SignUpClass} />
                    <Route path="/signUpForProvider" component={SignUpForProvider} />
                    <Route path="/signIn" component={SignInClass} />
                    <Route path="/pleaseSignIn" component={PleaseSignIn} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/passwordReset" component={PasswordResetClass} />
                    <Route path="/chooseUserType" component={ChooseUserType} />
                    <Route path="/listPage" component={ListPage} />
                    <Route path="/profilePageForProviders" component={ProfilePageForProviders} />
                    <Route path="/providerCard" component={ProviderCard} />
                </Switch>
            </Router>
        );
    }
}

export default compose(withFirebase)(MainPage);
