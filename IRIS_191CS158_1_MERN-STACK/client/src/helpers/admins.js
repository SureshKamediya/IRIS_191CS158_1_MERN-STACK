import axios from 'axios';
import querystring from "querystring";


const instance = axios.create({
    baseURL: 'http://localhost:8082/',
    port: 8082,
    headers:{
      "Content-Type":'application/x-www-form-urlencoded',
    }
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form- urlencoded';
axios.defaults.crossDomain = true;



export function setAuthToken(token){

  if (token) {
      // Apply authorization token to every request if logged in   
      axios.defaults.headers.common['Authorization'] = token;
    }
  else{
      delete axios.defaults.headers.common['Authorization'];
  }
};

export async function login(email,password){

  const data = {
      'email':email,
      'password':password
  };
  const resp = await instance.post('/admins/login',querystring.stringify(data),{withCredentials:true});
  return resp.data;
};

export async function logout(){
   
  const resp = await axios.get('http://localhost:8082/admins/logout',{withCredentials:true});
  return resp.data;
};

export async function getadminDetails(){

  const resp = await axios.get('http://localhost:8082/adminDashboard/admin',{withCredentials:true});
  console.log(resp);
  return resp.data;
}









