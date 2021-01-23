import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isFindNowButtonClicked: false,
            menuOpen: false
        }
    }


    getMainPageDisplay = () => {

        if (!this.state.isFindNowButtonClicked) {
            return (  
            <div className="btn-div">
                <p className="description">the best way to find the best service</p>
                <button className="findnow_button" type="button" onClick={() => this.setState({isFindNowButtonClicked: true})}>FIND NOW</button>
            </div>
            )
            

        } else {
            return (
            <div className="search-div">
                <p>Which one do you need?</p>
                <div className="services">

                <Link to="/listpage/id:dogwalkers" className="link_to_list">
                    <div className="service services_dw">Dog Walker</div>
                </Link>
                <Link to="/listpage/id:babysitters" className="link_to_list">
                    <div className="service services_bs">Babysitter</div>
                </Link>
                
                </div>
            </div>
            )
        }
    }

    render() {

        return (
                <div className="wrapper">
                    
                    <div className="content">
                            <h1>neighborhood</h1>
                            <div>{this.getMainPageDisplay()}</div>
                    </div>

            </div>
        );
    }
}

export default Home;