import React from 'react';
// import dogWalkersList from '../DogWalkersList';
import '../dogwalkers.css';
// import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';
// import Firebase from '../firebase';
import { withFirebase } from '../firebase';
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
        console.log('url', url)
        const id = url.substring(url.lastIndexOf(":") + 1, url.length);
        console.log('id', id);
        const email = sessionstorage.getItem("user")
        console.log('componentDidMount email dw ', email)
        let user = await this.props.firebase.getUserByEmail(email)
        console.log('getUserByEmail user', user)
        if (user !== null && user.location !== undefined && user.location !== null) {
            this.getProvidersByLocation(user.location, id);
        } else this.getProviders(id)
         
        // 
        // // if (user.service === "dogwalker") {
        //     this.getDWByLocation(user.location);
        // } 
        // this.getAllDogWalkers1();
    }

    // getAllDogWalkers1 = async() => {
    //     const arr = await this.props.firebase.getAllDogWalkers()
    //     console.log("arr2",arr);
    //     this.setState({ dogWalkers: arr})
    // }

    getProviders = async (id) => {
        let arr;
        console.log('getProviders - location, id ', id)
        if (id === "dogwalkers") {
            arr = await this.props.firebase.getAllDogWalkers()
        } else if (id === "babysitters") {
            arr = await this.props.firebase.getAllBabysitters()
        }
            console.log('getProviders - arr', arr);
        this.setState({ list: arr, id, loading: false})
    }

    getProvidersByLocation = async (location, id) => {
        let arr;
        console.log('getProvidersByLocation - location, id ', location, id)
        if (id === "dogwalkers") {
            arr = await this.props.firebase.getAllDogWalkersByLocation(location)
        } else if (id === "babysitters") {
            arr = await this.props.firebase.getAllBabysittersByLocation(location)
        }
            console.log('getProvidersByLocation - arr', arr);
        this.setState({ list: arr, id, loading: false})
    }

        // this.props.firebase.getAllDogWalkers()
        // const arr = []
        // const response=this.props.firebase.db.collection('dogwalkers');
        // console.log("response", response);
        // const data=await response.get();
        // console.log("data", data);
        // console.log("data.docs", data.docs)
        // data.docs.forEach(item=>{
        // //  setBlogs([...blogs,item.data()])
        // console.log(item.data());
        // arr.push(item.data())
        
        
        // })
        // this.setState({ dogWalkers: arr})
    
    clickCell=(address) => {
        window.location.href = address
    }
    // clickCell=(id) =>{
    //     window.location.href = "/chat/id:"+id
    // }
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
        let arr = []
        for (let i = 0; i < 12 / NUM_OF_PROVIDERS_ON_PAGE; i++) {
            arr.push(
                <p key={i} className="page_number" style={{opacity: this.state.pageNumber === (i)?'1':'0.8'}}
                 onClick = {() => this.changePageNum(i)}>{i+1}</p>
            )
        }
        return arr
    }
    getProvidersList = () => {

        let arr = [];    
        if (this.state.list !== undefined){     
        for (let i = this.state.pageNumber * NUM_OF_PROVIDERS_ON_PAGE;
             i < (this.state.pageNumber * NUM_OF_PROVIDERS_ON_PAGE) + NUM_OF_PROVIDERS_ON_PAGE 
             && i < this.state.list.length;
             i += 1) {
            let provider = this.state.list[i];
            let ratingSrc = this.getProvidersRating(provider)
            console.log('ratingSrc -', ratingSrc)
            arr.push (
                <div className="link" key={i} onClick={()=>this.clickCell("/pleaseSignIn")}>
                {/* // <Link to="/chat" className="link" key={dogWalker.id}>                 */}
                    <li className="dw_item">
                        <img src="/images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="dw_name">{provider.displayName}</p>
                        <p className="dw_price">{"₪"}{provider.price}</p>
                        <img className="dw_rating" src={ratingSrc} alt="star_img" />
                        {/* <p className="dw_rating">r - {rating}</p> */}
                        
                    </li>
                {/* // </Link>     */}
                </div>            
            );
        }     
    }  
             
        return arr;
    }     

    changePageNum = (num)=>{
        this.setState({pageNumber: num});
    }

    // changeColor = () => {
    //     this.setState({pageColor: 'rgba(242, 216, 81, 0.3)'})
    // }

    render() {
        // const pageNumberStyle = {
        //     backgroundColor: this.state.pageColor,
        //     paddingLeft: '5px',
        //     paddingRight: '5px',
        //     borderRadius: '10px'
        // }

        return (
            <div className="dw_wrapper"
            style={{backgroundImage: this.state.id ==="dogwalkers"?
                "url(/images/dw_bg.png)"
            : "url(/images/bs_bg.png)"
        

}}
            >
                {/* <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="/images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="/images/cross_btn.png" alt="Close" /> }
                    className="react_menu"
                    isOpen={ this.state.menuOpen }
                    // onClose={ this.handleOnClose }
                    customOnKeyDown={this.toggleMenu}
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu> */}
                {/* <img src="/images/hamburger_menu.png" alt="Menu" className="dw_hamburger_menu"/> */}

                {this.state.loading===true?
                <div><h1>Loading...</h1></div>
            :
            
                <div className="dw_content">
                    <h2>{this.state.id}</h2>
                    <ul className="dw_list">
                        <div>{this.getProvidersList()}</div>
                    </ul>
                    <div className="pages_numbers">
                        {this.getPageNumbers()}
                        {/* <p className="page_number" style={{opacity: this.state.pageNumber === "0"?'1':'0.8'}} onClick = {() => this.changePageNum(0)}>1</p>
                        <p className="page_number" style={{opacity: this.state.pageNumber === "1"?'1':'0.8'}} onClick = {() => this.changePageNum(1)}>2</p>
                        <p className="page_number" style={{opacity: this.state.pageNumber === "2"?'1':'0.8'}} onClick = {() => this.changePageNum(2)}>3</p> */}
                    </div>
                </div>         
    }            
            </div>
        )
    }
}

export default compose(withFirebase)(ListPage);
