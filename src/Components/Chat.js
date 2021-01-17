import React from 'react';
import '../chat.css';
// import socketIOClient from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // loading: true,
            // socket: null,
            // endpoint: 'http://localhost:8000',
            // cluentId: null,
        }
    }


//     componentDidMount() {
//         const { endpoint } = this.state;

//         // Made a connection with server
//         const socket = socketIOClient(endpoint)
//         console.log(socket);

//         socket.on("connected", data => {
//             console.log("hi");
//             this.setState({
//                 socket: socket,
//                 loading: false,
//                 clientId: data.id,
//             })
//         });
        
//         //sendMsg
//         socket.on("sendMsg", data => {
//             console.log("sendMsg - data:",data);
//         })
// }


// sendMsgToServer = () => {
//     const { socket, clientId } = this.state;
//     const url = window.location.href
//     const id = url.substring(url.lastIndexOf(":") + 1, url.length)


//     socket.emit("sendingAmsg", {
//         msg:"hello back!",
//         from: clientId,
//         to: id
//     })
// }

    render() {       
        
        // if (this.state.loading) {
        //     return <h1>Loading...</h1>
        // }
        return (
            <div className="chat_wrapper">
                {/* <button onClick={this.sendMsgToServer}>Click</button> */}
                <img src="/images/hamburger_menu.png" alt="Menu" className="chat_hamburger_menu"/>
                <div className="chat_content">
                        <div className="chat_header" />
                        <div className="chat_field" />
                        <div className="chat_message">
                            <image src="/images/attachment.png" alt="Attach" className="attach_icon" />
                            <input type="text" placeholder="Type a message" className="typing_field" />
                            <image src="/images/send.png" alt="Send" className="send_icon" />
                        </div>
                </div>         
                            
            </div>
        );
    }
}

export default Chat;