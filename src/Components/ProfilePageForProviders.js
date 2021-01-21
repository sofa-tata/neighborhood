import React from 'react';
import '../profilepage.css';
import sessionstorage from 'sessionstorage';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';


class ProfilePageForProviders extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            location: null,
            service: null,
            id: ""
        }
    }


    componentDidMount = () => {
        const url = window.location.href
        let id = url.substring(url.lastIndexOf(":") + 1, url.length);// babysitter 
        // let id = url.substring(url.lastIndexOf(":"), url.length-1);// :babysitte 
        
        console.log('url--',url,'--')
        console.log('url dogwalkers',url.includes("dogwalkers"))
        console.log('url babysitters',url.includes("babysitters"))

        console.log('id--',id,'--')
        console.log('props--',this.props.match.params.id,'--')
        console.log('props length--',this.props.match.params.id.length,'--')
        console.log('props 0--',this.props.match.params.id[0],'--')
        let id2 = this.props.match.params.id
        console.log('id2--',id2,'--')
        id2 = id2.substring(0 , id2.length);
        console.log('id2--',id2,'--')

        let arr = id2.split(":")
        console.log('arr',arr)
        console.log('arr[1]--',arr[1],'--')

        // id = id.replace(" ", "")
        // console.log('props', this.props)
        // let bool1  = url.includes('\%20')
        // console.log('bool1', bool1)
        // let bool2  = url.includes(' ')
        // console.log('bool2', bool2)
        // let bool3  = url.includes('+')
        // console.log('bool3', bool3)
        // console.log('1. componentDidMount id--',id,'--')
        // id = id.replace(" ", "")
        // id = id.replace(/%20/g, "")
        // console.log('2. componentDidMount id--',id,'--')

        const email = sessionstorage.getItem("user")
        this.getProvider(arr[1], email)
    }

    getProvider = async (id, email) => {
        console.log('getProvider +id--'+id+'--')
        console.log('getProvider ,id--',id,'--')
        console.log('getProvider email', email)
        let user;        
        console.log('id== dogwalkers',(id === "dogwalker"))
        console.log('id== babysitters',(id === "babysitter"))
        if (id.includes("dogwalker")) {
            console.log('if dogwalkers')
            user = await this.props.firebase.getDogwalkerByEmail(email)
        } else if (id.includes("babysitter")) {
            console.log('if babysitters')
            user = await this.props.firebase.getBabysitterByEmail(email)
        }
        console.log('getProvider user', user)
        if(user!==undefined){
            this.setState({ name: user.displayName, email: user.email, location: user.location, 
                service: user.service })
        }
    }

    signOut=() => {
        sessionstorage.removeItem("user")
        this.props.firebase.doSignOut()
        window.location.href = "/signIn"
    }

    render() {
        return (
            <div className="pp_wrapper">
                <img src="/images/hamburger_menu.png" alt="Menu" className="pp_hamburger_menu"/>
                <h5 className="signout_btn" onClick={() => this.signOut()}>Sign Out</h5>
                <div className="pp_content">
                    <img src="/images/profile_160px.png" alt="Profile" className="pp_profile_img" />
                    <h3 className="pp_name">{this.state.name}</h3>
                    <h5 className="provider-of">{this.state.service}</h5>
                    <h4 className="pp_email">{this.state.email}</h4>
                    <h4 className="pp_email">{this.state.location}</h4>
                </div>
            </div>
        )
    }

}

export default compose(withFirebase)(ProfilePageForProviders);