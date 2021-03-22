import GitClient from '../../github/client'
import { GET_AUTH_URL_SUCCESS, CREATE_CLIENT_SUCCESS, CLIENT_LOGIN_SUCCESS } from "./authTypes"

function getGitUrlSuccess(auth_url) {
    return {
        type: GET_AUTH_URL_SUCCESS,
        payload: auth_url
    }
}

function clientLoginSuccess(token) {
    return {
        type: CLIENT_LOGIN_SUCCESS,
        payload: token
    }
}

function createClientSuccess(client) {
    return {
        type: CREATE_CLIENT_SUCCESS,
        payload: client
    }
}

export function createGitUrl() {
    return function (dispatch) {
        GitClient.getAuthUrl().then(auth_url => {
            dispatch(getGitUrlSuccess(auth_url))
        })
    }
}

export function clientLogin(code) {
    return function (dispatch) {
        GitClient.login(code).then(token => {
            localStorage.setItem('access_token', token)
            dispatch(clientLoginSuccess(token))
        })
    }
}

export function createClient() {
    return function (dispatch) {
        // Create a new git client with token
        const client = GitClient
        dispatch(createClientSuccess(client))
    }
}
