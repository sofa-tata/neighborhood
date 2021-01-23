import React from 'react';
import './ListPage.css';
import { withFirebase } from '../../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';

const NUM_OF_PROVIDERS_ON_PAGE = 3;


class ListPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            pageNumber: 0,
            pageColor: "",
            id: "",
            list: []
        }
    }

    componentDidMount = async () => {
        const url = window.location.href
        const id = url.substring(url.lastIndexOf(":") + 1, url.length);
        const email = sessionstorage.getItem("user")
        let user = await this.props.firebase.getUserByEmail(email)
        if (user !== null && user.location !== undefined && user.location !== null) {
            this.getProvidersByLocation(user.location, id);
        } else this.getProviders(id)

    }


    getProviders = async (id) => {
        let providersList;
        if (id === "dogwalkers") {
            providersList = await this.props.firebase.getAllDogWalkers()
        } else if (id === "babysitters") {
            providersList = await this.props.firebase.getAllBabysitters()
        }
        this.setState({ list: providersList, id, loading: false})
    }

    getProvidersByLocation = async (location, id) => {
        let providersListByLocation;
        if (id === "dogwalkers") {
            providersListByLocation = await this.props.firebase.getAllDogWalkersByLocation(location)
        } else if (id === "babysitters") {
            providersListByLocation = await this.props.firebase.getAllBabysittersByLocation(location)
        }
        this.setState({ list: providersListByLocation, id, loading: false})
    }

    
    clickCell=(address) => {
        window.location.href = address
    }

    getProvidersRating = (provider) => {
        let src = ""
        if (provider.rating === 5) {
            src="/images/5st.png"
        }else if (provider.rating === 4) {
            src="/images/4st.png"
        } else if (provider.rating === 3) {
            src="/images/3st.png"
        } else if (provider.rating === 2) {
            src="/images/2st.png"
        } else if (provider.rating === 1) {
            src="/images/1st.png"
        } else src="/images/0st.png"

        return src
    }

    getPageNumbers = () => {
        const { pageNumber, list } = this.state
        let pageNumbers = []
            for (let i = 0; i < list.length / NUM_OF_PROVIDERS_ON_PAGE; i++) {
                pageNumbers.push(
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
        if (list !== undefined) {     
        for (let i = pageNumber * NUM_OF_PROVIDERS_ON_PAGE;
             i < (pageNumber * NUM_OF_PROVIDERS_ON_PAGE) + NUM_OF_PROVIDERS_ON_PAGE 
             && i < list.length;
             i += 1) {
            let provider = list[i];
            let ratingSrc = this.getProvidersRating(provider)
            arrangedProvidersList.push (
                <div className="link" key={i} onClick={()=> this.clickCell("/providerCard")}>

                    <li className="dw_item">

                        <img src="/images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="dw_name">{provider.displayName}</p>
                        <p className="dw_price">{"₪"}{provider.price}</p>
                        <img className="dw_rating" src={ratingSrc} alt="star_img" />
                        
                    </li>

                </div>            
                );
            } 
        }
             
        return arrangedProvidersList;
    }

    displayList = () => {
        const { list, id } = this.state
        if (list !== undefined) {
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
            return <p className="no_sellers">There is no {id} in your city yet :(</p>
        }
    }

    changePageNum = (num) => {
        this.setState({pageNumber: num});
    }

    render() {
        const { loading, id } = this.state
        return (
            <div className="dw_wrapper"
            style={{backgroundImage: id ==="dogwalkers" ?
            "url(/images/dw_bg.png)"
            : "url(/images/bs_bg.png)" }}>

                {loading === true ?
                <div><h2 className="list_title loading">Loading...</h2></div>
                :            
                <div className="dw_content">
                    
                    <h2 className="list_title">{id}</h2>
                    {this.displayList()}                    

                </div>         
                }

            </div>
        )
    }
}

export default compose(withFirebase)(ListPage);
