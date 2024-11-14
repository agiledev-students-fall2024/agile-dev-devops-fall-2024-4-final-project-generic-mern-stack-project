const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  console.warn('API URL not configured. Please check your environment variables.');
}

export { API_URL };