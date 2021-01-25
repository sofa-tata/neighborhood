import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isOpen: false,
            menuOpen: false
        }
    }

    componentDidMount = () => {
        if (window.location.href.includes('/open')) {
            this.setState({isOpen: true})
        }
    }


    getMainPageDisplay = () => {

        if (!this.state.isOpen) {
            return (  
            <div className="btn-div">
                <p className="description">the best way to find the best service</p>
                <button className="findnow_button" type="button" onClick={() => window.location.href="/open"}>FIND NOW</button>
                {/* <button className="findnow_button" type="button" onClick={() => this.setState({isOpen: true})}>FIND NOW</button> */}
            </div>
            )
            

        } else {
            return (
            <div className="search-div">
                <p className="description">Which one do you need?</p>
                <div className="services">

                <Link to="/listpage/dogwalkers" className="link_to_list">
                    <div className="service services_dw">Dog Walker</div>
                </Link>
                <Link to="/listpage/babysitters" className="link_to_list">
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