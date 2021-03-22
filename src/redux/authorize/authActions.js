import { auth_url, createGitClient, gitLogin } from "../../github/config"
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
        dispatch(getGitUrlSuccess(auth_url))
    }
}

export function clientLogin(code) {
    return function (dispatch) {
        gitLogin(code).then(token => {
            // Store the token to local storage
            localStorage.setItem('access_token', token)
            dispatch(clientLoginSuccess(token))
        })
    }
}

export function createClient() {
    return function (dispatch) {
        // Create a new git client with token
        const token = localStorage.getItem('access_token')
        const client = createGitClient(token)
        dispatch(createClientSuccess(client))
    }
}
