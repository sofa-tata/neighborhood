import React from 'react';
import { Link } from 'react-router-dom';
import OverlayMenu from '../Components/OverlayMenu';

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isFindNowButtonClicked: false,
            isOverlayMenuOpen: false,
            searchTerm: ""
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu = () => {
        this.setState({isOverlayMenuOpen: !this.state.isOverlayMenuOpen});
        console.log(this.state.isOverlayMenuOpen)
    }
    // onChangeSearch=(event)=>{
    //     this.setState({searchTerm: event.currentTarget.value})
    // }

    getMenuDisplay = () => {
        if (!this.state.isOverlayMenuOpen) {
            return <OverlayMenu />
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

                {/* <input type="text" placeholder="Type in the service you are looking for" value={this.state.searchTerm} className="search"
                onChange={this.onChangeSearch}
                /> */}
                <p>Which one do you need?</p>
                <div className="services">
                <Link to="/dogwalkerspage" className="link_to_list"><div className="service services_dw">Dog Walker</div></Link>
                <Link to="/dogwalkerspage" className="link_to_list"><div className="service services_bs">Babysitter</div></Link>
                {/* <Link to="/dogwalkerspage"><div>Manicurists</div><img src="images/arrow.png" alt="Arrow" className="arrow_forth" /></Link> */}
                </div>
            </div>
            )
        }
    }

    render() {
        

        return (
                <div className="wrapper">
                    <img src="images/hamburger_menu.png" alt="menu" className="hamburger_menu" onClick={this.toggleMenu}/>
                    <div className="content">
                            <h1>neighborhood</h1>
                            <div>{this.getMainPageDisplay()}</div>
                    </div>
                    {this.getMenuDisplay}     
                            
            </div>
        );
    }
}

export default Home;