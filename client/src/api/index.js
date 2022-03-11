import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5500",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

export const signup = async (data) => { return await instance.post('/api/signup', data) }
export const login = async (data) => { return await instance.post('/api/login', data) }
export const getProfile = async () => { return await instance.get('/api/get-profile') }

export const showOnFeed = async () => { return await instance.get('/api/posts/show-on-feed') }
export const createPost = async (data) => { return await instance.post('/api/posts/create', data) }

export const accountDetails = async (username) => { return await instance.get(`/api/users/${username}`) }

export default instance;