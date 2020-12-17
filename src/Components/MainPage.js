import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import DogWalkersPage from './DogWalkersPage';
import Chat from './Chat';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PleaseSignIn from './AskForSignIn';
import ProfilePage from './ProfilePage';
import PasswordReset from './PasswordReset';
import OverlayMenu from './OverlayMenu';



class MainPage extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/dogwalkerspage" component={DogWalkersPage} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/pleaseSignIn" component={PleaseSignIn} />
                    <Route path="/profilePage" component={ProfilePage} />
                    <Route path="/passwordReset" component={PasswordReset} />
                    <Route path="/menu" component={OverlayMenu} />

                </Switch>
            </Router>
        );
    }
}

export default MainPage;
