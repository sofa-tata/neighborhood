// import React, { createContext } from 'react';
// import Firebase from '../firebase.js';

// export const UserContext = createContext({ user: null });

// class UserProvider extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             user: null
//         }
//     }

//     componentDidMount = async () => {
//         Firebase.auth.onAuthStateChanged(async userAuth => {
//             const user = await generateUserDocument(userAuth);
//             this.setState({ user });
//         })
//     }

//     render() {
//         return (
//             <UserContext.Provider value={this.state.user}>
//                 {this.props.children}
//             </UserContext.Provider>
//         );
//     }
// }

// export default UserProvider;