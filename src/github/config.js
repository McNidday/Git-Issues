import github from 'octonode'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

export const auth_url = github.auth.config({
    id: CLIENT_ID,
    secret: CLIENT_SECRET
}).login(['user', 'repo', 'gist']);

export const createGitClient = (access_token) => {
    let client;
    if (access_token) {
        client = github.client(access_token)
    } else {
        client = github.client()
    }
    client.requestDefaults['proxy'] = 'https://mkniddaygitissues.herokuapp.com'
    // Return client
    return client
}

export const gitLogin = code => new Promise((resolve, reject) => {
    github.auth.login(code, function (err, token) {
        if (err) {
            reject(err.message)
        } else {
            resolve(token)
        }
    })
})