import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ChatInput.css';

function ChatInput(props) {
    const { onSend: handleSend } = props;

    const [ value, setValue ] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value.trim() === '' ) {
            return;
        }
        handleSend(value);
        setValue('');
    }

    return (
        <form className='chat-input' onSubmit={handleSubmit}>
            <div className="input-block">
                <textarea name="input-textarea" 
                id="input-textarea" 
                className='input-textarea' 
                value={value}
                onChange={handleChange}></textarea>
            </div>
            <button className='send-message'></button>
        </form>
    )
}

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
};

export default ChatInput;

