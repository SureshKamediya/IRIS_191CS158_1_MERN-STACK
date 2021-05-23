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


