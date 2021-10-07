import React, { Component } from 'react';
import  uuidv4 from 'uuid';
import './Chat.css';
import ChatList from './ChatList/ChatList';
import ChatInput from './ChatInput/ChatInput';

class Chat extends Component {
    constructor(props) {
        super(props)

        if (!localStorage.getItem("userId")) {
            localStorage.setItem("userId", uuidv4());
        }
        this.userId = localStorage.getItem("userId");
        this.state = {
            data: [],
            userId: this.userId,
            waiting: true,
            timer: 30,
        }

        this.requestData = this.requestData.bind(this);
        this.handleSend = this.handleSend.bind(this);
    } 

    componentDidMount() {
        this.requestData();
    }

    componentDidUpdate() {
        this.timerId = setTimeout(this.requestData, 1000 * 5)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    async requestData() {

        const lastMessageId = (this.state.data.length === 0) ? 0 : this.state.data[this.state.data.length - 1].id

        await fetch(`${process.env.REACT_APP_CURRENCY_URL}/messages?from=${lastMessageId}`)
        .then( response => response.json() )
        .then( result => {
            if (result.lenght === 0) {
                return;
            }
            this.setState( prev => ({...prev, data: [...prev.data, ...result]}));
        })
    }

    handleSend = (text) => {
        fetch(`${process.env.REACT_APP_CURRENCY_URL}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                userId: this.userId,
                content: text,
            }),
        })
    }

    render() {
        return (
            <div className='chat'>
                <h1 className='chat-h1'>
                    Anonymous Chat
                </h1>
                <ChatList list={this.state.data} myId={this.state.userId}/>
                <ChatInput onSend={this.handleSend}/>
            </div>
        )
    }
}

export default Chat;

