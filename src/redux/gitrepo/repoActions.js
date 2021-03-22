import { FETCH_USER_REPOS_SUCCESS, EXTERNAL_REPO_EXISTS, FETCH_EXTERNAL_REPO_ERROR_REMOVE, FETCH_EXTERNAL_REPO_ERROR, FETCH_EXTERNAL_REPO_SUCCESS, LOAD_EXTERNAL_REPO, FETCH_USER_REPOS_FAILURE, KEEPER_NAME_INPUT_ACTION, REPO_NAME_INPUT_ACTION, LOADING_GIT_REPOS, FETCH_SAVED_PUBLIC_REPOS_SUCCESS } from "./repoTypes";

function fetchGitReposSuccess(repos, defaultRepo) {
    return {
        type: FETCH_USER_REPOS_SUCCESS,
        payload: { repos, defaultRepo }
    }
}

function fetchGitReposFailure(err, cashedRepos, defaultRepo) {
    return {
        type: FETCH_USER_REPOS_FAILURE,
        payload: { repos: cashedRepos, err: err, defaultRepo }
    }
}

function fetchSavedPublicReposSuccess(exRepos, defaultExRepo) {
    // console.log(exRepos, defaultExRepo)
    return {
        type: FETCH_SAVED_PUBLIC_REPOS_SUCCESS,
        payload: { exRepos: exRepos, defaultExRepo: defaultExRepo }
    }
}

function loadingGitRepos() {
    return {
        type: LOADING_GIT_REPOS
    }
}

function repoNameInputActionSuccess(value) {
    return {
        type: REPO_NAME_INPUT_ACTION,
        payload: value
    }
}

function keeperInputActionSuccess(value) {
    return {
        type: KEEPER_NAME_INPUT_ACTION,
        payload: value
    }
}

function loadingExternalRepo(value) {
    return {
        type: LOAD_EXTERNAL_REPO,
        payload: value
    }
}

function fetchExternalRepoSucces(exRepos, defaultExRepo) {
    return {
        type: FETCH_EXTERNAL_REPO_SUCCESS,
        payload: { exRepos, defaultExRepo }
    }
}

function externalRepoExists() {
    return {
        type: EXTERNAL_REPO_EXISTS
    }
}

function fetchExternalRepoError(error) {
    return {
        type: FETCH_EXTERNAL_REPO_ERROR,
        payload: error
    }
}

function fetchExternalRepoErrorRemove() {
    return {
        type: FETCH_EXTERNAL_REPO_ERROR_REMOVE
    }
}

export function fetchGitRepos(client) {
    return function (dispatch) {
        dispatch(loadingGitRepos())
        client.repos().then(repos => {
            if (!repos) return dispatch(fetchGitReposSuccess([], ''))
            // Store the fetched repos
            localStorage.setItem('repos', JSON.stringify(repos))
            dispatch(fetchGitReposSuccess(repos, repos[0].full_name))
        }).catch(err => {
            const cashedRepos = localStorage.getItem('repos');
            dispatch(fetchGitReposFailure(err.response.data, cashedRepos && cashedRepos !== "undefined" ? JSON.parse(cashedRepos) : []), cashedRepos && cashedRepos !== "undefined" ? JSON.parse(cashedRepos)[0].full_name : '')
        })
    }
}

export function fetchSavedPublicRepos() {
    return function (dispatch) {
        let exRepos = localStorage.getItem('exRepos')
        if (exRepos) exRepos = JSON.parse(exRepos)
        if (!exRepos) exRepos = []
        dispatch(fetchSavedPublicReposSuccess(exRepos, exRepos.length > 0 ? exRepos[0].full_name : ''))
    }
}

export function repoNameInputAction(value) {
    return function (dispatch) {
        dispatch(repoNameInputActionSuccess(value))
    }
}

export function keeperInputAction(value) {
    return function (dispatch) {
        dispatch(keeperInputActionSuccess(value))
    }
}

export function fetchExternalRepo(client, values) {
    return function (dispatch) {
        dispatch(loadingExternalRepo())
        let defaultExRepo;
        // Get the repository 
        client.repo(values).then(info => {
            // Get all personal repos if any
            let exRepos = localStorage.getItem('exRepos')
            if (exRepos) {
                exRepos = JSON.parse(exRepos)
                defaultExRepo = exRepos[0].full_name
                const findOne = exRepos.findIndex(r => {
                    return r.id === info.id
                })
                if (findOne < 0) {
                    exRepos.push(info)
                    localStorage.setItem('exRepos', JSON.stringify(exRepos))
                    dispatch(fetchExternalRepoSucces(exRepos))
                } else {
                    dispatch(externalRepoExists())
                    setTimeout(() => {
                        dispatch(fetchExternalRepoSucces(exRepos, defaultExRepo))
                    }, 5000)
                }
            } else {
                defaultExRepo = info.full_name
                const newRepo = [info]
                localStorage.setItem('exRepos', JSON.stringify(newRepo))
                dispatch(fetchExternalRepoSucces(newRepo, defaultExRepo))
            }
        }).catch(error => {
            dispatch(fetchExternalRepoError(error.response.data))
            setTimeout(() => {
                dispatch(fetchExternalRepoErrorRemove())
            }, 5000)
        })
    }
}

export function removeCashedExternalRepo(id) {
    return function (dispatch) {
        let exRepos = localStorage.getItem('exRepos')
        if (exRepos) {
            exRepos = JSON.parse(exRepos)
            const findOne = exRepos.findIndex(r => {
                return r.id === id
            })
            if (findOne < 0) {
                dispatch(fetchExternalRepoSucces(exRepos, exRepos[0].full_name))
            } else {
                const newRepos = exRepos.filter(r => {
                    return r.id !== id
                })
                if (newRepos.length > 0) localStorage.setItem('exRepos', JSON.stringify(newRepos))
                if (newRepos.length <= 0) localStorage.removeItem('exRepos')
                dispatch(fetchExternalRepoSucces(newRepos, newRepos[0] ? newRepos[0].full_name : ''))
            }
        } else {
            dispatch(fetchExternalRepoSucces([], ''))
        }
        window.location.replace('/issues')
    }
}