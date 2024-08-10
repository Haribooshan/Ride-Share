import axios from 'axios'
import { userFields } from '../constants';

const BASE_URL = 'https://ride-share-api.onrender.com';

export async function getUserById(userId){
    return await axios.get(`${BASE_URL}/api/v1/user/${userId}`, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}