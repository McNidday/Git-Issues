import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { repoNameInputAction, keeperInputAction, fetchExternalRepo } from '../redux/gitrepo/repoActions';
import ClientContext from './contexts/ClientContext'
import classes from '../css/sideNavigation.module.css'

function ExReposFormContainer(props) {
    const client = useContext(ClientContext)

    function handleRepoSubmit(e) {
        e.preventDefault();
        const values = props.exKeeper + '/' + props.exRepoName
        props.fetchExternalRepo(client, values)
    }
    function handleExKeeperInput(e) {
        props.keeperInputAction(e.target.value)
    }
    function handleExRepoNameInput(e) {
        props.repoNameInputAction(e.target.value)
    }

    return (
        <React.Fragment>
            <ul>
                <form>
                    {props.exError ? <div className={classes.error}>{props.exError}</div> : ''}
                    {props.exRepoExists ? <div className={classes.repoExists}>Repo Already Exists</div> : ''}
                    <label>Client/User/Creator</label>
                    <input onChange={handleExKeeperInput} type="text" value={props.exKeeper}></input>
                    <label>Repo Name</label>
                    <input onChange={handleExRepoNameInput} value={props.exRepoName} type="text"></input>
                    <div className={classes.buttonWrapper}>
                        <button className={props.exLoading ? classes.disabled : ''} onClick={handleRepoSubmit}>Get Repo</button>
                        {props.exLoading ? <div className={classes.loader}><span></span></div> : ''}
                    </div>
                </form>
            </ul>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        exRepoExists: state.repo.exRepoExists,
        exRepoName: state.repo.exRepoName,
        exKeeper: state.repo.exKeeper,
        exLoading: state.repo.exLoading,
        exError: state.repo.exError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        keeperInputAction: value => dispatch(keeperInputAction(value)),
        repoNameInputAction: value => dispatch(repoNameInputAction(value)),
        fetchExternalRepo: (client, values) => dispatch(fetchExternalRepo(client, values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExReposFormContainer)
