import React from 'react';
import '../babysitters.css';
import { slide as Menu} from 'react-burger-menu';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';




class BabysittersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 0,
            pageColor: "",
            babysitters: []
        }
    }

    componentDidMount = async () => {
        // this.getAllBabysitters1();
        const email = sessionstorage.getItem("user")
        console.log('componentDidMount email bs ', email)
        let user = await this.props.firebase.getUserByEmail(email)
        console.log('getUserByEmail user', user)
        this.getBSByLocation(user.location);
        // this.getBSByLocation();
    }

    // getAllBabysitters1 = async() => {
    //     const arr = await this.props.firebase.getAllBabysitters()
    //     console.log("arr2",arr);
    //     this.setState({ babysitters: arr})
    // }

    getBSByLocation = async location => {
        console.log('getBSByLocation - location ', location)
        const arr = await this.props.firebase.getAllBabysittersByLocation(location)
        console.log('getBSByLocation - arr2', arr);
        this.setState({ babysitters: arr})
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

    babysittersRating = (babysitter) => {
        let src = ""
        if (babysitter.rating === 5) {
            src="/images/5st.png"
        }else if (babysitter.rating === 4) {
            src="/images/4st.png"
        } else if (babysitter.rating === 3) {
            src="/images/3st.png"
        } else if (babysitter.rating === 2) {
            src="/images/2st.png"
        } else if (babysitter.rating === 1) {
            src="/images/1st.png"
        } else src="/images/0st.png"

        return src
    }
    // clickCell=(id) =>{
    //     window.location.href = "/chat/id:"+id
    // }
    getBabysittersList = () => {
        

        let arr = [];
        if (this.state.babysitters !== undefined){         
        for (let i = this.state.pageNumber * 3; i < (this.state.pageNumber * 3) + 3 && i < this.state.babysitters.length; i += 1) {
            let babysitter = this.state.babysitters[i];
            let ratingSrc = this.babysittersRating(babysitter);
            console.log('ratingSrc -', ratingSrc)
            arr.push (
                <div className="link" key={i} onClick={()=>this.clickCell("/pleaseSignIn")}>
                {/* // <Link to="/chat" className="link" key={dogWalker.id}>                 */}
                    <li className="bs_item">
                        <img src="/images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="bs_name">{babysitter.displayName}</p>
                        <p className="bs_price">{"₪"}{babysitter.price}</p>
                        <img className="bs_rating" src={ratingSrc} alt="star_img" />
                        {/* <p className="bs_rating">{this.babysittersRating(babysitter)}</p> */}
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
            <div className="bs_wrapper">
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
                <div className="bs_content">
                    <h2>babysitters</h2>
                    <ul className="bs_list">
                        <div>{this.getBabysittersList()}</div>
                    </ul>
                    <div className="pages_numbers">
                        <p className="page_number" style={{opacity: this.state.pageNumber === "0"?'1':'0.8'}} onClick = {() => this.changePageNum(0)}>1</p>
                        <p className="page_number" style={{opacity: this.state.pageNumber === "1"?'1':'0.8'}} onClick = {() => this.changePageNum(1)}>2</p>
                        <p className="page_number" style={{opacity: this.state.pageNumber === "2"?'1':'0.8'}} onClick = {() => this.changePageNum(2)}>3</p>
                    </div>
                </div>         
                            
            </div>
        )
    }
}

export default compose(withFirebase)(BabysittersPage);
