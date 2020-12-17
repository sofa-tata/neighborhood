import React from 'react';
import dogWalkersList from '../DogWalkersList';
import '../dogwalkers.css';
// import { Link } from 'react-router-dom';


class DogWalkersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 0
        }
    }

    
    clickCell=() => {
        window.location.href = "/pleaseSignIn"
    }
    // clickCell=(id) =>{
    //     window.location.href = "/chat/id:"+id
    // }
    getDogWalkersList = () => {
        const dogWalkersRating = (walker) => {
            if (walker.rating === 3) {
                return <img src="images/3stars.png" alt="3 stars" />
            } else {
                return <img src="images/2stars.png" alt="2 stars" />
            }
        }

        let arr = [];         
        for (let i = this.state.pageNumber * 3; i < (this.state.pageNumber * 3) + 3 && i < dogWalkersList.length; i += 1) {
            let dogWalker = dogWalkersList[i];
            arr.push (
                <div className="link" key={dogWalker.name} onClick={()=>this.clickCell()}>
                {/* // <Link to="/chat" className="link" key={dogWalker.id}>                 */}
                    <li key={dogWalker.id} className="dw_item">
                        <img src="images/profile_icon.png" alt="Profile" className="profile_icon" />
                        <p className="dw_name">{dogWalker.name}</p>
                        <p className="dw_price">{dogWalker.price}</p>
                        <p className="dw_distance">{dogWalker.distance}</p>
                        <p className="dw_rating">{dogWalkersRating(dogWalker)}</p>
                    </li>
                {/* // </Link>     */}
                </div>            
            );
        }       
             
        return arr;
    }     

    changePageNum = (num)=>{
        this.setState({pageNumber: num});
    }

    render() {
        return (
            <div className="dw_wrapper">
                <img src="images/hamburger_menu.png" alt="Menu" className="dw_hamburger_menu"/>
                <div className="dw_content">
                    <h2>dog walkers</h2>
                    <ul className="dw_list">
                        <div>{this.getDogWalkersList()}</div>
                    </ul>
                    <div className="pages_numbers">
                        <p className="page_number" onClick = {() => this.changePageNum(0)}>1</p>
                        <p className="page_number" onClick = {() => this.changePageNum(1)}>2</p>
                        <p className="page_number" onClick = {() => this.changePageNum(2)}>3</p>
                    </div>
                </div>         
                            
            </div>
        )
    }
}

export default DogWalkersPage;