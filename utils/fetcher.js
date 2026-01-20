import axios from 'axios';

// Create an Axios instance
const fetcher = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api', // Use Next.js API routes
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
fetcher.interceptors.request.use(
    (config) => {
        // Add authorization token or other custom headers if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor
fetcher.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            console.error('API Error:', error.response);
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default fetcher;