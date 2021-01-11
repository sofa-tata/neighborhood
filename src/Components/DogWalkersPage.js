import React from 'react';
// import dogWalkersList from '../DogWalkersList';
import '../dogwalkers.css';
// import { Link } from 'react-router-dom';
import { slide as Menu} from 'react-burger-menu';
// import Firebase from '../firebase';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import sessionstorage from 'sessionstorage';




class DogWalkersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 0,
            pageColor: "",
            dogWalkers: []
        }
    }

    componentDidMount = async () => {
        
        const email = sessionstorage.getItem("user")
        console.log('email ', email)
        let user = await this.props.firebase.getUserByEmail(email)
        console.log('componentDidMount user', user)
        this.getDWByLocation(user.location);
        // this.getAllDogWalkers1();
    }

    // getAllDogWalkers1 = async() => {
    //     const arr = await this.props.firebase.getAllDogWalkers()
    //     console.log("arr2",arr);
    //     this.setState({ dogWalkers: arr})
    // }

    getDWByLocation = async location => {
        console.log('getDWByLocation - location ', location)
        const arr = await this.props.firebase.getAllDogWalkersByLocation(location)
        console.log('getDWByLocation - arr2', arr);
        this.setState({ dogWalkers: arr})
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
    dogWalkersRating = (walker) => {
        let src = ""
        if (walker.rating === 5) {
            src="images/5st.png"
        }else if (walker.rating === 4) {
            src="images/4st.png"
        } else if (walker.rating === 3) {
            src="images/3st.png"
        } else if (walker.rating === 2) {
            src="images/2st.png"
        } else if (walker.rating === 1) {
            src="images/1st.png"
        } else src="images/0st.png"

        return src
    }

    getDogWalkersList = () => {

        let arr = [];    
        if(this.state.dogWalkers !== undefined){     
        for (let i = this.state.pageNumber * 3; i < (this.state.pageNumber * 3) + 3 && i < this.state.dogWalkers.length; i += 1) {
            let dogWalker = this.state.dogWalkers[i];
            let ratingSrc = this.dogWalkersRating(dogWalker)
            console.log('ratingSrc -', ratingSrc)
            arr.push (
                <div className="link" key={i} onClick={()=>this.clickCell("/pleaseSignIn")}>
                {/* // <Link to="/chat" className="link" key={dogWalker.id}>                 */}
                    <li className="dw_item">
                        <img src="images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="dw_name">name-{dogWalker.displayName}</p>
                        <p className="dw_price">p - {dogWalker.price}</p>
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
            <div className="dw_wrapper">
                <Menu 
                    right 
                    width = { '30%' }
                    customBurgerIcon={ <img src="images/hamburger_menu.png" alt="Menu" /> } 
                    customCrossIcon={ <img src="images/cross_btn.png" alt="Close" /> }
                    className="react_menu"
                    isOpen={ this.state.menuOpen }
                    // onClose={ this.handleOnClose }
                    customOnKeyDown={this.toggleMenu}
                    >
                        <a id="home" className="menu-item home-item" href="/">HOME</a>
                        <a id="about" className="menu-item" href="/signIn">SIGN IN</a>
                        <a id="contact" className="menu-item" href="/chooseUserType">SIGN UP</a>
                    </Menu>
                {/* <img src="images/hamburger_menu.png" alt="Menu" className="dw_hamburger_menu"/> */}
                <div className="dw_content">
                    <h2>dog walkers</h2>
                    <ul className="dw_list">
                        <div>{this.getDogWalkersList()}</div>
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

export default compose(withFirebase)(DogWalkersPage);
