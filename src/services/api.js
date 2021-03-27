import axios from 'axios';

const dentaldietApi = (token) => axios.create({
    withCredentials: true,
    headers: {'x-access-token': token},
    timeout: 5000,
    baseURL: (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD
});

export default dentaldietApi;
