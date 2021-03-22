import axios from 'axios'
class GitClient {
    constructor() {
        this.url = 'https://mkniddaygitissuesbackend.herokuapp.com'
        // this.url = 'http://localhost:4000'
        this.appendeClientToken()
    }

    appendeClientToken() {
        const access_token = localStorage.getItem('access_token')
        if (access_token) this.access_token = access_token
    }

    async getAuthUrl() {
        const response = await axios.get(this.url + '/auth_url')
        return response.data
    }

    async login(code) {
        const response = await axios.get(this.url + `/user/login?code=${code}`)
        // Set the access token to class
        this.access_token = response.data
        return response.data
    }

    async repos() {
        const response = await axios.get(this.url + `/user/repos?access_token=${this.access_token}`)
        return response.data
    }

    async info() {
        const response = await axios.get(this.url + `/user/info?access_token=${this.access_token}`)
        return response.data
    }

    async issues(repo, config, page) {
        if (!page) page = 1
        const response = await axios({
            method: 'post',
            url: this.url + `/user/issues?access_token=${this.access_token}&repo=${repo}`,
            data: { ...config, page: page }
        })
        return response.data
    }

    async search(q) {
        const response = await axios({
            method: 'post',
            url: this.url + `/search/issues?access_token=${this.access_token}`,
            data: { q: q }
        })
        return response.data
    }

    async repo(values) {
        const response = await axios({
            method: 'post',
            url: this.url + `/repo`,
            data: { values: values }
        })
        return response.data
    }
}


export default new GitClient