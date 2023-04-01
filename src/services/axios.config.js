import axios from 'axios';

const instance = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/${process.env.REACT_APP_API_VERSION}`,
});

export default instance;