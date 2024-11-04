import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:${process.env.REACT_APP_BACK_PORT}`,
});

export default instance;