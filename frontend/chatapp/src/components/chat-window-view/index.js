import React, { Component } from 'react';
import Identicon from 'identicon.js';
import '../../styles/chatwindow.css';
import {
    sendMessage,
    getMessages,
    registerReceiveMsg,
} from '../../data/socket';
import { Comment } from 'semantic-ui-react';
import User from '../../model/User';


export default class ChatWindowView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: '',
            user: User.getNickname(),
            userId: User.getUserId()
        };
    }

    componentDidMount() {
        registerReceiveMsg(newMessage => {
            console.log("received msg: ", newMessage)
            let messagesCopy = this.state.messages.slice();
            messagesCopy.push(newMessage);
            this.setState({messages: messagesCopy});
        })

        this.getMessagesInRoom(this.props.room._id);
    }

    /*
    *   Called right before components is destroyed. Do cleanup here on listeners etc...
    */
    componentWillUnmount() {

    }

    getMessagesInRoom(roomId) {
        getMessages(roomId).then(messages => {
            this.setState({messages: messages});
        })
        .catch(err => {
            console.log(err);
        });
    }

    send() {
        console.log('Sent: ' + this.state.input);
        this.setState({input: ''});
        sendMessage({
            text: this.state.input,
            user: this.state.userId,
            room: this.props.room._id,
        });
    }

    render() {
        return (
            <div>
                <h2>{"#" + this.props.room.name.replace(/_/g, ' ')}</h2>
                <p>{this.props.room.description ? this.props.room.description : 'Public chat room'}</p>
                    <div className="ui segment">

                    <MessageList messageArr={ this.state.messages }/>

                    <form className="ui reply form">
                        <div className="field">
                            <textarea
                                className="chat-input"
                                value={this.state.input}
                                placeholder="Write a message... "
                                autoFocus
                                onChange={e => {
                                    if (e.target.value !== '\n') {
                                        this.setState({input: e.target.value});
                                    }
                                }}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        this.send();
                                    }
                                }}
                                />
                        </div>
                        <div className="ui blue labeled submit icon button" onClick={() => this.send()}>
                            <i className="icon edit"></i> Send
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

const MessageList = (props) => {
    return (
        <div className="ui scroll">
            <div className="ui comments">
                { props.messageArr.map((msg) => <MessageItem key={ msg._id } item={ msg }/>) }
            </div>
        </div>
    );
}

//append a leading zero to strings with length of one
function singleDigitPrepend(data){
    if(data.toString().length === 1){
        data = "0" + data
    }
    return data
}

//reformats the timestamp to yyyy-mm-dd hh:mm:ss
function formatTimestamp(time){
    var dateObj = new Date(time);
    var y = dateObj.getFullYear();
    var m = singleDigitPrepend(dateObj.getMonth() + 1);
    var d = singleDigitPrepend(dateObj.getDate());

    var hour = singleDigitPrepend(dateObj.getHours());
    var min = singleDigitPrepend(dateObj.getMinutes());
    var sec = singleDigitPrepend(dateObj.getSeconds());

    return "Posted: " + y + "-" + m + "-" + d + " " + hour + ":" + min + ":" + sec;
}

//computes time since last post by using a timestamp
function lastPosted(time){
    var ta = require('time-ago');
    return ta.ago(time);
}

function generateIcon(user) {
    let hashFromUser = user? user._id : 'oiaw590uif0u934598uerue489tiuh';
    return `data:image/png;base64,${new Identicon(hashFromUser)}`;
}

/*
*   Stateless component for displaying a message
*   props:  message= message Object
*/
const MessageItem = (props) => {
    return (
        <Comment key={ props.item._id }>
            <Comment.Avatar src={generateIcon(props.item.user)} />
            <Comment.Content>
                <Comment.Author as='a'>{ props.item.user ? props.item.user : 'Anonymous' }</Comment.Author>
                <Comment.Metadata>
                    <div>{ formatTimestamp(props.item.time_stamp) }</div>
                </Comment.Metadata>

                <Comment.Metadata>
                    { lastPosted(props.item.time_stamp) }
                </Comment.Metadata>
                <Comment.Text>{ props.item.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}
