import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const Button = (props) => {
    return (
        <div onClick={props.onClickHandler} className={css(ss.button)}>
            {props.text}
        </div>
    )
}

const ss = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        color: '#fff',
        background: '#2ebd59',
        padding: '10px 40px',
        borderRadius: 200,
        fontWeight: 600,
        cursor: 'pointer',
        transition: '0.2s ease-in-out',
        margin: '30px 0',
        ':hover': {
            background: '#1ed760'
        }
    }
});

export default Button;