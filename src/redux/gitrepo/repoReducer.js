import { FETCH_USER_REPOS_FAILURE, FETCH_EXTERNAL_REPO_ERROR_REMOVE, FETCH_EXTERNAL_REPO_SUCCESS, FETCH_EXTERNAL_REPO_ERROR, EXTERNAL_REPO_EXISTS, FETCH_USER_REPOS_SUCCESS, LOAD_EXTERNAL_REPO, LOADING_GIT_REPOS, FETCH_SAVED_PUBLIC_REPOS_SUCCESS, KEEPER_NAME_INPUT_ACTION, REPO_NAME_INPUT_ACTION } from "./repoTypes"

const initialState = {
    defaultRepo: false,
    defaultExRepo: false,
    repos: [],
    exRepos: [],
    loading: false,
    exLoading: false,
    error: false,
    exKeeper: '',
    exRepoName: '',
    exRepoExists: false,
    exError: false
}

const repoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REPOS_SUCCESS: return {
            ...state,
            defaultRepo: action.payload.defaultRepo,
            repos: action.payload.repos,
            loading: false,
            error: false
        }
        case FETCH_USER_REPOS_FAILURE: return {
            ...state,
            defaultRepo: action.payload.defaultRepo,
            error: action.payload.err,
            repos: action.payload.repos,
            loading: false
        }
        case LOADING_GIT_REPOS: return {
            ...state,
            loading: true
        }
        case FETCH_SAVED_PUBLIC_REPOS_SUCCESS: return {
            ...state,
            exRepos: action.payload
        }
        case KEEPER_NAME_INPUT_ACTION: return {
            ...state,
            exKeeper: action.payload
        }
        case REPO_NAME_INPUT_ACTION: return {
            ...state,
            exRepoName: action.payload
        }
        case LOAD_EXTERNAL_REPO: return {
            ...state,
            exLoading: true
        }
        case FETCH_EXTERNAL_REPO_SUCCESS: return {
            ...state,
            defaultExRepo: action.payload.defaultExRepo,
            exRepoExists: false,
            exLoading: false,
            exKeeper: '',
            exRepoName: '',
            exRepos: action.payload.exRepos
        }
        case EXTERNAL_REPO_EXISTS: return {
            ...state,
            exLoading: false,
            exRepoExists: true
        }
        case FETCH_EXTERNAL_REPO_ERROR: return {
            ...state,
            exLoading: false,
            exError: action.payload,
            exRepoExists: false
        }
        case FETCH_EXTERNAL_REPO_ERROR_REMOVE: return {
            ...state,
            exError: false
        }
        default: return state
    }
}

export default repoReducer