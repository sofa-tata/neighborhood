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



class MainPage extends React.Component {
    render() {
        return (
            <Router>
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
                    <Route path="/passwordReset" component={PasswordResetClass} />
                    <Route path="/chooseUserType" component={ChooseUserType} />
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
