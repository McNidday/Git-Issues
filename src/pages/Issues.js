import React, { useEffect } from 'react'
import IssuesContainer from '../components/IssuesContainer'
import queryString from 'query-string'
import { clientLogin, createClient } from '../redux'
import { connect } from 'react-redux'
import classes from '../css/issuesLayout.module.css'
import SideNavContainer from '../components/SideNavContainer'
import { ClientProvider } from '../components/contexts/ClientContext'
import TopNavContainer from '../components/TopNavContainer'

function Issues(props) {
    useEffect(() => {
        const parsed = queryString.parse(window.location.search)
        // If the code exists and token does not exist then login to git
        const access_token = localStorage.getItem('access_token')
        if (parsed.code && !access_token) {
            props.clientLogin(parsed.code)
        } else {
            props.createClient()
        }
    }, [])

    return (
        <ClientProvider value={props.client}>
            <div className={classes.issues}>
                <SideNavContainer></SideNavContainer>
                <TopNavContainer></TopNavContainer>
                <IssuesContainer></IssuesContainer>
            </div>
        </ClientProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        client: state.auth.client,
        access_token: state.auth.access_token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clientLogin: (code) => dispatch(clientLogin(code)),
        createClient: () => dispatch(createClient())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues)
