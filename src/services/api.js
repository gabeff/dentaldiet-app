import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_API_DEV : process.env.REACT_APP_API_PROD
});

// api.interceptors.request.use(
//     config => {
        
//         if (localStorage.getItem("@dentaldiet/access")) {
//             config.headers.Authorization = `JWT ${localStorage.getItem("@dentaldiet/access")}`;
//         }

//         return config;
//     },
//     error => Promise.reject(error)
// );

export default api;
