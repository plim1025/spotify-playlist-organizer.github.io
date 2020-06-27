import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Button from '../components/Button';
import background from '../assets/img/login-background.jpg';

const Login = () => {
    return (
        <div className={css(ss.wrapper)} style={{backgroundImage: `url(${background})`}}>
            <div className={css(ss.textParent)}>
                <div className={css(ss.textTitle)}>Generate Organized Playlists</div>
                <div className={css(ss.textBody)}>Filter your music based on attributes such as beats per minute, mood, popularity, and more.</div>
            </div>
            <Button 
                text={'LOGIN'}
                onClick={() => window.location='http://localhost:3000/login'}
                className={css(ss.button)} 
            />
        </div>

    )
}

const ss = StyleSheet.create({
    wrapper: {
        height: 'calc(100% - 70px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgorundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    },
    textParent: {
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 840,
        width: 'calc(100% - 50px)',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 60,
        fontWeight: 600
    },
    textBody: {
        fontSize: 30,
        marginTop: 30,

    },
});

export default Login;