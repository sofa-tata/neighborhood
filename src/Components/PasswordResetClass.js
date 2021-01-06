import React from 'react';
import '../passwordreset.css';
import { Link } from 'react-router-dom';
// import Firebase from '../firebase';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';


class PasswordResetClass extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            emailHasBeenSent: false,
            error: null
        }
    }

    onChangeHandler = event => {
       const { name, value } = event.currentTarget;
       if (name === "userEmail") {
           this.setState({ email: value});
       }
    }

    sendResetEmail = async () => {
        let sucess = false
        let error = await  this.props.firebase .doPasswordReset(this.state.email)
        console.log('error', error)

        if (error === null) {
            this.setState({ emailHasBeenSent: true })
        } else {
            this.setState({ error: error, emailHasBeenSent: false});
        }

            

        // this.props.firebase
        // .doPasswordReset(this.state.email)
        // .then(() => {
        //     // event.preventDefault();
        //     console.log(this.state.emailHasBeenSent)
        //     // setTimeout(() => this.setState({ emailHasBeenSent: false }), 5000);
        //     sucess = true
        //     console.log(this.state.emailHasBeenSent)
        // })
        // .catch((error) => {
        //     // event.preventDefault();
        //     sucess = false
        //     this.setState({ error: "Error resetting password!"});
        //     console.log('error: ', error.message)
        // })
        // if(sucess === true){
        //     this.setState({ emailHasBeenSent: true });
        // }else{
            
        //     this.setState({ emailHasBeenSent: false });
        // }
    }
    render() {

        return (
            <div className="reset_wrapper">
                <div className="reset_content">
                    <h3>Reset your password:</h3>
                    <div className="reset_form">
                    {/* <form action="" className="reset_form"> */}
                        {this.state.emailHasBeenSent === true ?
                            <div style={{color: '#4D63D4', fontSize: '30px'}}>An email has been sent to you! :)</div>
                            :
                            null
                        }
                        {this.state.error !== null && (
                            <div style={{color: 'red', fontSize: '30px'}}>{this.state.error}</div>
                        )}
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={this.state.email}
                            placeholder="Input your email"
                            onChange={this.onChangeHandler}
                            className="reset_input"
                        />
                        <button className="reset_btn" onClick={this.sendResetEmail}>Send me a reset link</button>
                    {/* </form> */}
                    </div>
                    <Link to="/signIn" className="reset_back">Back to Sign In page</Link>                    
                </div>
            </div>
        )
    }
}


// export default PasswordResetClass;
export default compose(withFirebase)(PasswordResetClass);