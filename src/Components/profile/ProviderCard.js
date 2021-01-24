import React from 'react';
import './ProviderCard.css'
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';

class ProviderCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            providerName: "",
            providerPrice: "",
            providerLocation: "",
            providerService: null,
            providerDescription: ""
        }
    }

    componentDidMount = () => {
        console.log('this.props.match.params', this.props.match.params)
        this.getChosenProvider()

    }

    getChosenProvider = async () => {
        const url = window.location.href
        console.log('url', url)
        const providerEmail = url.substring(url.lastIndexOf(":") + 1, url.length);
        console.log('providerEmail', providerEmail)
        let currentProvider = await this.props.firebase.getUserByEmail(providerEmail);
        if (currentProvider.service === "dogwalker") {
            currentProvider = await this.props.firebase.getDogwalkerByEmail(providerEmail)
        } else {
            currentProvider = await this.props.firebase.getBabysitterByEmail(providerEmail)
        }

        console.log('currentProvider', currentProvider)
        this.setState({providerName: currentProvider.displayName,
        providerPrice: currentProvider.price,
        providerLocation: currentProvider.location,
        providerService: currentProvider.service,
        providerDescription: currentProvider.about })
    }

    render () {
        const { providerLocation, providerPrice, providerName, providerService, providerDescription } = this.state
        return (
            <div className="pcard_wrapper">

                <div className="pcard_content">

                    <div className="pcard_location_price">
                        <p>location: {providerLocation}</p>
                        <p>price: ₪{providerPrice}</p>
                    </div>
                    
                    <img src="/images/profile_160px.png"
                    alt="Profile" 
                    className="pcard_profile_img" />
 
                    <p style={{color: 'orange'}}>{providerService} {providerName}</p>
                    <p>{providerDescription}</p>
                    {/* <h4 className="pcard_email">{this.state.rating}</h4>                     */}

                    
                     
                </div>

            </div>
        )
    }
}

export default compose(withFirebase)(ProviderCard);