import axios from 'axios'
const ROOT_URL = 'http://localhost:4040'
export default {
    fetchIFiles() {
        return axios.get(`${ROOT_URL}/mainScreen`)
    }
}