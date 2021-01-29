import React from 'react';
import './ListPage.css';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';
import csc from 'country-state-city';

const NUM_OF_PROVIDERS_ON_PAGE = 3;


class ListPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            pageNumber: 0,
            pageColor: "",
            providerType: "",
            searchLocation: "",
            list: []
        }
    }

    componentDidMount = async () => {
        const url = window.location.href
        const providerType = url.substring(url.lastIndexOf("/") + 1, url.length)
        const email = sessionstorage.getItem("email")
        let user = await this.props.firebase.getUserByEmail(email)
        if (user === null || user.service !== null){
            this.getProviders(providerType)
        } else {
            this.setState({
                searchLocation: user.location,
            }, () => {
                    this.getProvidersByLocation(user.location, providerType)
            })
        }
    }

    getProviders = async (providerType) => {
        let providersList;
        if (providerType === "dogwalkers") {
            providersList = await this.props.firebase.getAllDogWalkers()
        } else if (providerType === "babysitters") {
            providersList = await this.props.firebase.getAllBabysitters()
        }
        this.setState({ list: providersList, providerType, loading: false})
    }

    getProvidersByLocation = async (location, providerType) => {
        let providersListByLocation;
        if (providerType === "dogwalkers") {
            providersListByLocation = await this.props.firebase.getAllDogWalkersByLocation(location)
        } else if (providerType === "babysitters") {
            providersListByLocation = await this.props.firebase.getAllBabysittersByLocation(location)
        }
        this.setState({ list: providersListByLocation, providerType, loading: false})
    }

    
    clickCell = (address, email) => {
        window.location.href = address + email
    }

    getProvidersRating = (provider) => {
        let src = ""
        if (provider.rating === 5) {
            src="/images/5st.png"
        } else if (provider.rating === 4) {
            src="/images/4st.png"
        } else if (provider.rating === 3) {
            src="/images/3st.png"
        } else if (provider.rating === 2) {
            src="/images/2st.png"
        } else if (provider.rating === 1) {
            src="/images/1st.png"
        } else src='/images/0st.png'

        return src
    }

    getPageNumbers = () => {
        const { pageNumber, list } = this.state
        let pageNumbers = []
            for (let i = 0; i < list.length / NUM_OF_PROVIDERS_ON_PAGE; i++) {
                pageNumbers.push (
                    <p key={i} className="page_number" style={{opacity: pageNumber 
                    === (i) ? '1' : '0.8'}}
                    onClick = {() => this.changePageNum(i)}>{i+1}</p>
                )
            }
        return pageNumbers 
    }

    getProvidersList = () => {
        const { pageNumber, list } = this.state
        let arrangedProvidersList = [];        
        for (let i = pageNumber * NUM_OF_PROVIDERS_ON_PAGE;
             i < (pageNumber * NUM_OF_PROVIDERS_ON_PAGE) + NUM_OF_PROVIDERS_ON_PAGE 
             && i < list.length;
             i += 1) {
            let provider = list[i];
            let ratingSrc = this.getProvidersRating(provider)
            arrangedProvidersList.push (
                <div className="link" key={i} onClick={()=> this.clickCell("/providerCard/", provider.email)}>

                    <li className="dw_item">

                        <img src="/images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="dw_name">{provider.displayName}</p>
                        <p className="dw_price">{"₪"}{provider.price}</p>
                        <p className="dw_location">{provider.location}</p>
                        <img className="dw_rating" src={ratingSrc} alt="star_img" />
                        
                    </li>

                </div>            
            );
        } 
    
        return arrangedProvidersList;
    }

    displayList = () => {
        const { list, providerType } = this.state
        if (list !== undefined && list.length !== 0) {
            return (
                <>
                    <ul className="dw_list">
                        <div>{this.getProvidersList()}</div>
                    </ul>
                    <div className="pages_numbers">
                        {this.getPageNumbers()}                        
                    </div>
                </>
            )
        } else {
            return <p className="no_sellers">There are no {providerType} in this city yet :(</p>
        }
    }

    changePageNum = (num) => {
        this.setState({pageNumber: num});
    }

    onChangeLocation = event => {
        let location = event.target.value
        this.setState({ searchLocation: location }, () => {
            if (location === ""){
                this.getProviders(this.state.providerType)
            } else {
                this.getProvidersByLocation(location, this.state.providerType)
            }
        });
    }

    render() {
        const { loading, providerType, searchLocation } = this.state
        const cities = csc.getCitiesOfCountry("IL");
        return (
            <div className="dw_wrapper"
            style={{backgroundImage: providerType ==="dogwalkers" ?
            "url(/images/dw_bg.png)"
            : "url(/images/bs_bg.png)" }}>                

                    {loading === true ?
                    <div><h2 className="list_title loading">Loading...</h2></div>
                    :    
                    <div className="smaller_wrapper">

                        <select
                        name="searchLocation"  
                        id="searchLocation" 
                        className="signup_input location select listpage_select" 
                        onChange = {this.onChangeLocation}
                        value={searchLocation}
                        >
                            <option value="">Choose location</option>
                            {cities.map((city,i) => 
                            <option id="city" key={i} value={city.value}>{city.name}</option>)}
                        </select>
                              
                        <div className="dw_content">
                            
                            <h2 className="list_title">{providerType}</h2>
                            {this.displayList()}                    

                        </div>

                    </div>         
                    }
                
            </div>
        )
    }
}

export default compose(withFirebase)(ListPage);
