import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import classes from '../css/signin.module.css'
import { createGitUrl } from '../redux'

function SignIn(props) {
    useEffect(() => {
        props.createGitUrl();
    }, [])
    return (
        <div>
            <div className={classes.signinContainer}>
                <div className={classes.logo}><img src='/github-issues.jpg'></img></div>
                <div className={classes.signinInfo}>Please Signin with github to enable <strong>MkNidday Github Issues Tracker</strong> full features</div>
                <div className={classes.signinInfo}>You can also sign in as guest...</div>
                <div className={classes.linksContainer}>
                    <a href={props.auth_url} className={classes.gitLogo}><span>GitHub SignIn</span> <img src="/github-logo.png"></img></a>
                    <p>or</p>
                    <a href='/issues' className={classes.guestLink}><span>Guest SignIn</span> <img src="/guest.png"></img></a>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        auth_url: state.auth.auth_url
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        createGitUrl: () => dispach(createGitUrl())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)