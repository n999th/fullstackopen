import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const get = () => {
    return axios.get(baseUrl);
}

const create = newObj => {
    return axios.post(baseUrl, newObj);
}

export default {
    get,
    create
}
