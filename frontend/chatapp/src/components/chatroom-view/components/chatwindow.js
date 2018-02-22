import React, { Component } from 'react';

import '../../../styles/chatwindow.css';
import backendService from '../../../data/FakeBackendService';
//import backendService from '../../../data/BackendService';

const MessageItem = (props) =>  {
    return <p>USER:{props.postedBy}:   MSG:{props.value}</p>;
};

const MessageList = (props) => {
    const msgItems = props.messages.map((msg) =>
        // Correct! Key should be specified inside the array.
        <MessageItem
            key={msg.id}
            value={ msg.msg_text }
            postedBy={ msg.user }
        />
    );
    return (
        <div>
            {msgItems}
        </div>
    );
}

class ChatWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: '',
            user: 'Anonymous'
        };
    }

    componentDidMount() {
        backendService.findAll("roomid-1", (data) => {
            this.setState({ messages: data });
        })
    }


    send() {
        console.log("Message Sent");
        let newMsg = {
            user: this.state.user,
            room:"romid-1",
            msg_text: this.state.input
        };

        backendService.create(newMsg, (data) => {
            this.setState({ messages: data });
        });
        // TODO: Send for real
    }



    render() {
        return (
            <div>
                <div className="row">
                    <div className="offset-md-1 col-md-10">
                        <MessageList messages={this.state.messages}/>;
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-1 col-md-8">
                        <textarea
                            className="chat-input"
                            value={this.state.input}
                            placeholder="Write a message... (what you type here won't actually be sent yet!)"
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
                    <button onClick={() => this.send()} className="col-md-1 btn-send">Send</button>
                </div>
            </div>
        );
    };
}

export default ChatWindow;
