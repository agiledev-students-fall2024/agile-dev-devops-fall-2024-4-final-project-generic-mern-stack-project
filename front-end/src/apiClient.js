// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: `${process.env.REACT_APP_BACK_PORT}`,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     console.log(token)
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
