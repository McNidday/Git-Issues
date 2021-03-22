import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchSavedPublicRepos, removeCashedExternalRepo } from '../redux/gitrepo/repoActions'
import classes from '../css/sideNavigation.module.css'


function ExReposContainer(props) {
    useEffect(() => {
        // Fetch the stored external repos
        props.fetchSavedPublicRepos()
    }, [])

    function removeExternalRepo(id) {
        props.removeExternalRepo(id)
    }
    // console.log(props.exRepos)
    if (props.exRepos.length > 0) {
        return (
            <React.Fragment>
                <ul>
                    {props.exRepos.map(repo => {
                        return <li key={repo.id}><NavLink to={`/issues?repo=${repo.full_name}`} activeClassName={props.activeRepo === repo.full_name ? classes.selected : ''}><span>{repo.name}</span><span>{repo.open_issues_count}</span></NavLink><div onClick={() => removeExternalRepo(repo.id)}></div></li>
                        // return <li key={repo.id}><span>{repo.name}</span><span>{repo.open_issues_count}</span></li>
                    })}
                </ul>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ul>
                    <li>You Have No External/Public Repos. Add One Below</li>
                </ul>
            </React.Fragment>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        exRepos: state.repo.exRepos,
        activeRepo: state.issue.activeRepo
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchSavedPublicRepos: () => dispatch(fetchSavedPublicRepos()),
        removeExternalRepo: id => dispatch(removeCashedExternalRepo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExReposContainer)
