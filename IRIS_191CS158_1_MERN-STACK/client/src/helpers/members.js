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
    const resp = await instance.post('/members/login',querystring.stringify(data),{withCredentials:true});
    return resp.data;
  };
  
  export async function logout(){
     
    const resp = await axios.get('http://localhost:8082/members/logout',{withCredentials:true});
    return resp.data;
  };


export async function getAllMembers(){

  let urlOne = 'http://localhost:8082/members/allMembers';
  
  const response = await instance.get(urlOne);
  
  const membersData = {
      'members':response.data.data,
  };
  if(response.data.code === -1)
      membersData.authenticated = 0;
  else
      membersData.authenticated = 1;
  return membersData;
}

export async function getClubMembers(id){

  let urlOne = 'http://localhost:8082/members/clubMembers/'+id;
  
  const response = await instance.get(urlOne);
  
  const membersData = {
      'clMembers':response.data.data,
  };
  if(response.data.code === -1)
      membersData.authenticated = 0;
  else
      membersData.authenticated = 1;
  return membersData;
}


export async function getmemberDetails(){

    const resp = await axios.get('http://localhost:8082/request/member',{withCredentials:true});
    console.log(resp.data);
    return resp.data;
}


