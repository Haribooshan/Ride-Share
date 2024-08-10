import axios from 'axios'
import { userFields } from '../constants';

const BASE_URL = 'https://ride-share-api.onrender.com';

export async function login(data){
    return await axios.post(`${BASE_URL}/api/v1/auth/login`,data);
}

export async function register(data){
    return await axios.post(`${BASE_URL}/api/v1/auth/register`,data);
}

export async function verifyJWT(){
    return await axios.get(`${BASE_URL}/api/v1/auth/`,{
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}