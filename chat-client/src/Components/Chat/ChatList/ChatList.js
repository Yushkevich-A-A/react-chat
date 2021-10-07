import React from 'react';
import PropTypes from 'prop-types';

import './ChatList.css'
import ChatItem from './ChatItem/ChatItem';

function ChatList(props) {
    const { list, myId } = props;

    return (
        <div className='chat-list'>
            {
                list.map( item => <ChatItem 
                    key={item.id} 
                    myMessage={myId === item.userId ? true : false}
                    text={item.content} />)
            }
        </div>
    )
}

ChatList.propTypes = {
    list: PropTypes.array.isRequired,
    myId: PropTypes.string.isRequired,
};

export default ChatList;

