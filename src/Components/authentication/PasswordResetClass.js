import React from 'react';
import './PasswordReset.css';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../firebase';
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
        let error = await  this.props.firebase.doPasswordReset(this.state.email)

        if (error === null) {
            this.setState({ emailHasBeenSent: true })
        } else {
            this.setState({ error: error, emailHasBeenSent: false});
        }
    }
    render() {
        const { email, emailHasBeenSent, error} = this.state
        return (
            <div className="reset_wrapper">

                <div className="reset_content">

                    <h3>Reset your password:</h3>
                    <div className="reset_form">

                        {emailHasBeenSent === true ?
                            <div className="email_sent">An email has been sent to you! :)</div>
                            :
                            null
                        }
                        {error !== null && (
                            <div className="reset_error">{error}</div>
                        )}
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={email}
                            placeholder="Input your email"
                            onChange={this.onChangeHandler}
                            className="reset_input"
                        />
                        <button className="reset_btn" onClick={this.sendResetEmail}>
                        Send me a reset link</button>

                    </div>
                    <Link to="/signIn" className="reset_back">Back to Sign In page</Link> 

                </div>

            </div>
        )
    }
}


export default compose(withFirebase)(PasswordResetClass);