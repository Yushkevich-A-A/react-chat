import React from 'react';
import PropTypes from 'prop-types';

import './ChatItem.css';

function ChatItem(props) {
    const { myMessage, text} = props;

    return (
        <div className={'chat-item ' + (myMessage ? 'my-message' : '')}>
            {text}
        </div>
    )
}

ChatItem.propTypes = {
    myMessage: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default ChatItem;

