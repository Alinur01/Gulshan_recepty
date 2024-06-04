import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_IMAGE_URL
});

export default instance;
