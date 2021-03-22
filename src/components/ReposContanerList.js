import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { fetchGitRepos } from '../redux/gitrepo/repoActions'
import ClientContext from './contexts/ClientContext'
import classes from '../css/sideNavigation.module.css'
import { NavLink, useLocation } from 'react-router-dom'

function ReposContanerList(props) {
    const location = useLocation()
    const client = useContext(ClientContext)
    useEffect(() => {
        if (client) {
            props.fetchRepos(client)
        }
    }, [client, location])
    // console.log(props.activeRepo, props.repos, 'This is the active repoooooooooooo')
    // Map repos to elements
    if (props.repos.length > 0 && props.loading && !props.error) {
        // If loading and repo length is greater than 0
        // Load the repos but with a loading sign
        return (
            <React.Fragment>
                <ul>
                    <li className={classes.loading}>Loading Repos...</li>
                    {props.repos.map(repo => {
                        return <li key={repo.id}><NavLink to={`/issues?repo=${repo.full_name}`} activeClassName={props.activeRepo === repo.full_name ? classes.selected : ''}><span>{repo.name}</span><span>{repo.open_issues_count}</span></NavLink></li>
                    })}
                </ul>
            </React.Fragment>
        )
    } else if (props.repos.length > 0 && !props.loading && !props.error) {
        return (
            <React.Fragment>
                <ul>
                    {props.repos.map(repo => {
                        return <li key={repo.id}><NavLink to={`/issues?repo=${repo.full_name}`} activeClassName={props.activeRepo === repo.full_name ? classes.selected : ''}><span>{repo.name}</span><span>{repo.open_issues_count}</span></NavLink></li>
                    })}
                </ul>
            </React.Fragment>
        )
    } else if (props.repos.length < 1 && !props.loading && !props.error) {
        return (
            <React.Fragment>
                <ul>
                    <li className={classes.info}>No Repos Found...</li>
                </ul>
            </React.Fragment>
        )
    } else if (props.repos.length < 1 && props.loading && !props.error) {
        // If no repos then display loading in repos
        return (
            <React.Fragment>
                <ul>
                    <li className={classes.loading}>Loading Repos...</li>
                </ul>
            </React.Fragment>
        )
    } else if (props.repos.length > 1 && !props.loading && props.error) {
        return (
            <React.Fragment>
                <ul>
                    <li className={classes.error}>{props.error}</li>
                    {props.repos.map(repo => {
                        return <li key={repo.id}><NavLink to={`/issues?repo=${repo.full_name}`} activeClassName={props.activeRepo === repo.full_name ? classes.selected : ''}><span>{repo.name}</span><span>{repo.open_issues_count}</span></NavLink></li>
                    })}
                </ul>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ul>
                    <li className={classes.error}>{props.error}</li>
                </ul>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        repos: state.repo.repos,
        error: state.repo.error,
        loading: state.repo.loading,
        activeRepo: state.issue.activeRepo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRepos: client => dispatch(fetchGitRepos(client))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReposContanerList)
