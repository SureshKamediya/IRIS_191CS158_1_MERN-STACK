import axios from 'axios';

const instance = axios.create({
    baseURL: "https://suresh-tinder-clone.herokuapp.com",
});

export default instance;

