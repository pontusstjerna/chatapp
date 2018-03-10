import React, { Component } from 'react';
import Identicon from 'identicon.js';
import '../../styles/chatwindow.css';
import {
    sendMessage,
    getMessages,
    registerReceiveMsg,
    unregisterReceiveMsg,
    createAnonUser
} from '../../data/socket';
import { Comment } from 'semantic-ui-react';
import User from '../../model/User';
import { FormattedMessage  } from 'react-intl';
import { Format } from 'react-intl-format';
import UserView from '../user-view';

export default class ChatWindowView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: '',
            selectUser: null,
        };
        this.selectUser = this.selectUser.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount()");
        registerReceiveMsg(this);
        this.getMessagesInRoom(this.props.room._id);
    }

    /*
    *   Called right before components is destroyed. Do cleanup here on listeners etc...
    */
    componentWillUnmount() {
        console.log("componentWillUnmount()");
        unregisterReceiveMsg();
    }

    onReceiveMsg(newMessage) {
        console.log("onReceiveMsg: ", newMessage)
        if (newMessage.room === this.props.room._id) {
            let messagesCopy = this.state.messages.slice();
            messagesCopy.push(newMessage);
            this.setState({messages: messagesCopy});
        }
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
        if (User.getUserId() == null) {
            //Is anonymous and have no userid, create AnonUser and post with that id
            createAnonUser(User.getNickname())
            .then(anonUser => {
                User.userId = anonUser._id;
                console.log('Created ['+ User.userId +']Sending msg:' +  this.state.input);
                sendMessage({
                    text: this.state.input,
                    user: {
                        kind: "AnonUser",
                        item: User.getUserId()
                    },
                    room: this.props.room._id,
                });
                this.setState({input: ''});
            })
            .catch(err => {
                console.log("createAnonUser:", err);
            })
        } else {
            let kindOfUser = "User";
            if (!User.isLoggedIn()) {
                kindOfUser = "AnonUser";
            }
            // Post with existing user
            console.log('Sending msg:', this.state.input);
            sendMessage({
                text: this.state.input,
                user: {
                    kind: kindOfUser,
                    item: User.getUserId()
                },
                room: this.props.room._id,
            });
            this.setState({input: ''});
        }
    }

    selectUser(user){
      this.setState({selectUser: user});
    }

    render() {
        return (
            <Format>
            {intl => (
            <div>
                {this.state.selectUser &&
                    <UserView
                        user={this.state.selectUser}
                        onClose={() => this.setState({selectUser: null})}
                        generateIcon={generateIcon}
                        />
                }
                <div className="roomname">{"#" + this.props.room.name.replace(/_/g, ' ')}</div>
                <div className="nickname">{User.getNickname()}</div>
                <p>{this.props.room.description ? this.props.room.description : 'Public chat room'}</p>
                    <div className="ui segment">

                    <MessageList messageArr={ this.state.messages } selectUser={this.selectUser}/>

                    <form className="ui reply form">
                        <div className="field">
                            <textarea
                                className="chat-input"
                                value={this.state.input}
                                placeholder={intl.formatMessage({id:"chatwindow.input"})}
                                rows="2"
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
                            <i className="icon edit"></i> <FormattedMessage id = "chatwindow.send"/>
                        </div>
                    </form>
                </div>
            </div>
            )}
            </Format>
        );
    }

}

const MessageList = (props) => {
    return (
        <div className="ui scroll">
            <div className="ui comments">
                { props.messageArr.map((msg) => <MessageItem key={ msg._id } mItem={ msg } selectUser={props.selectUser}/>) }
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

function generateIcon(id) {
    return `data:image/png;base64,${new Identicon(id)}`;
}

/*
*   Stateless component for displaying a message
*   props:  message= message Object
*/
const MessageItem = (props) => {
    return (
        <Comment key={ props.mItem._id }>
            <Comment.Avatar src={generateIcon(props.mItem.user.item._id)} />
            <Comment.Content>
                <Comment.Author
                    as='a'
                    onClick={() => props.selectUser(props.mItem.user)}
                    >
                    { props.mItem.user.item.nickname }
                </Comment.Author>
                <Comment.Metadata>
                    <div>{ formatTimestamp(props.mItem.time_stamp) }</div>
                </Comment.Metadata>

                <Comment.Metadata>
                    { lastPosted(props.mItem.time_stamp) }
                </Comment.Metadata>
                <Comment.Text>{ props.mItem.text }</Comment.Text>
            </Comment.Content>
        </Comment>
    );
}
