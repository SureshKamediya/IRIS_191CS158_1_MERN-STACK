import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8082/',
    port: 8082,
    headers:{
      "Content-Type":'application/x-www-form-urlencoded',
    }
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form- urlencoded';
axios.defaults.crossDomain = true;









