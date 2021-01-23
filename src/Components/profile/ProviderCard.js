import React from 'react';
import './ProviderCard.css'
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';

class ProviderCard extends React.Component {
    constructor() {
        super()
        this.state = {
            providersName: "",
            providersPrice: "",
            providersLocation: "",
            providersService: null,
            providersDescription: ""
        }
    }

    getChosenProvider () {
        const { currentProvider } = this.props.firebase.getDogWalkerById
    }

    render () {
        return (
            <div className="pcard_wrapper">

                <div className="pcard_content">

                    <div className="pcard_location_price">
                        <p>location: </p>
                        <p>price: ₪</p>
                    </div>
                    
                    <img src="/images/profile_160px.png"
                    alt="Profile" 
                    className="pcard_profile_img" />
                    {/* 
                    <h3 className="pcard_name">{this.state.service} {this.state.name}</h3>
                    <h4 className="pcard_email">{this.state.rating}</h4>                    
                    <h4 className="pcard_email">{this.state.description}</h4>
                    
                     */}
                     
                </div>

            </div>
        )
    }
}

export default compose(withFirebase)(ProviderCard);