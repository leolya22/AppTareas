import axios from "axios";

import { getEnvVariables } from "../../helpers/getEnvVariables";


const { API_URL } = getEnvVariables();

const tasksApi = axios.create({
    baseURL: API_URL
});

tasksApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem( 'token' )
    }
    return config;
})

export default tasksApi;