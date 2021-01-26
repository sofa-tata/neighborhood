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
            providerDescription: "",
            providerRating: 0,
            providerEmail: ""
        }
    }

    componentDidMount = () => {
        console.log('this.props.match.params', this.props.match.params)
        this.getChosenProvider()

    }

    getProviderRatingSrc = (rating) => {
        let src = ""
        if (rating === 5) {
            src="/images/5st.png"
        }else if (rating === 4) {
            src="/images/4st.png"
        } else if (rating === 3) {
            src="/images/3st.png"
        } else if (rating === 2) {
            src="/images/2st.png"
        } else if (rating === 1) {
            src="/images/1st.png"
        } else src='/images/0st.png'

        return src
    }

    getChosenProvider = async () => {
        const url = window.location.href
        console.log('url', url)
        const providerEmail = url.substring(url.lastIndexOf("/") + 1, url.length);
        console.log('providerEmail', providerEmail)
        let currentProvider = await this.props.firebase.getUserByEmail(providerEmail);
        if (currentProvider.service === "dogwalker") {
            currentProvider = await this.props.firebase.getDogwalkerByEmail(providerEmail)
        } else {
            currentProvider = await this.props.firebase.getBabysitterByEmail(providerEmail)
        }

        console.log('currentProvider', currentProvider)
        this.setState({
            providerName: currentProvider.displayName,
            providerPrice: currentProvider.price,
            providerLocation: currentProvider.location,
            providerService: currentProvider.service,
            providerDescription: currentProvider.about,
            providerRating: currentProvider.rating,
            providerEmail: currentProvider.email
        })
    }

    render () {
        const { providerLocation, providerPrice, providerName, providerService, providerDescription, providerRating, providerEmail } = this.state
        let ratingSrc = this.getProviderRatingSrc(providerRating)
        return (
            <div className="pcard_wrapper">

                <div className="pcard_content">

                    <div className="pcard_location_price">
                        <p><span className="loc_price">location:</span> {providerLocation}</p>
                        <p><span className="loc_price">price:</span> ₪{providerPrice}/h</p>
                    </div>

                    <div className="provider_info">
                        <img src="/images/profile_160px.png"
                        alt="Profile" 
                        className="pcard_profile_img" />
    
                        <p className="pcard_service_name">{providerService} {providerName}</p>
                        <img src={ratingSrc} alt="star_img" className="rating_img"/>
                        <p className="pcard_about"><span style={{color: "#4D63D4"}}>Write me a message to:</span> {providerEmail}</p> 
                        <p className="pcard_about">{providerDescription}</p>
                    </div>                 
                     
                </div>

            </div>
        )
    }
}

export default compose(withFirebase)(ProviderCard);