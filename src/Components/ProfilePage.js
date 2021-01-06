import React from 'react';
import '../profilepage.css';
import sessionstorage from 'sessionstorage';
// import Firebase from '../firebase.js';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { slide as Menu} from 'react-burger-menu';

class ProfilePage extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: ""
        }
    }

    componentDidMount = async () => {
        console.log('componentDidMount')
        const email = sessionstorage.getItem("user")
        console.log('email ', email)
        let user = await this.props.firebase.getUserByEmail(email)
        console.log('componentDidMount user', user)
        this.setState({ name: user.displayName, email: user.email })

        
        // console.log("from session storage", email)

        // let ref = firestore.collection('dogwalkers');
        // var query = ref.where("email", "==", email)
        // console.log('query', query)
    //     ref.on('value' , snapshot =>{
    //     snapshot.forEach((dogwalker) => {
    //         console.log('dogwalker', dogwalker)
    //     })
    // })
  

    }

    signOut=() =>{
        sessionstorage.removeItem("user")
        this.props.firebase.doSignOut()
        window.location.href = "/signIn"
    }
    render() {
        return (
            <div className="pp_wrapper">
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
                    </Menu>
                {/* <img src="images/hamburger_menu.png" alt="Menu" className="pp_hamburger_menu"/> */}
                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">
                    <img src="images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{this.state.name}</h3>
                    <h4 className="pp_email">{this.state.email}</h4>
                </div>
            </div>
        )
    }

}

// export default ProfilePage;
export default compose(withFirebase)(ProfilePage);