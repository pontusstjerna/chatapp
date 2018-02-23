import React, { Component } from 'react';
import '../../../styles/chatwindow.css';
import { 
    send,
    registerListener,
} from '../../../data/socket';

class ChatWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            input: '',
            user: 'Anonymous',
        };
    }

    componentDidMount() {
        registerListener(msg => {
            console.log(JSON.stringify(msg));
            let messages = this.state.messages;
            messages.push(msg);
            this.setState({messages});
        });
    }

    send() {
        console.log('Sent: ' + this.state.input);
        this.setState({input: ''});
        
        // This is our "oo-model"
        send({
            text: this.state.input,
            userId: this.state.user,
            roomId: this.props.room,
        });
    }

    formatMessages() {
        return this.state.messages.map(({text, userId}) => 
            (userId ? userId : 'Anonymous') + ': ' + text).join('\n');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="offset-md-1 col-md-10"> 
                        <textarea 
                            className="chat-content" 
                            rows="20"
                            readOnly
                            value={this.formatMessages()}
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-1 col-md-8">
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
                    <button onClick={() => this.send()} className="col-md-1 btn-send">Send</button>
                </div>
            </div>
        );
    };
}

export default ChatWindow;
