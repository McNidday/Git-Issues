import React from 'react'
import SignIn from '../components/SignIn'
import classes from '../css/authLayout.module.css'

function Auth() {
    return (
        <div className={classes.auth}>
            <SignIn></SignIn>
        </div>
    )
}

export default Auth
