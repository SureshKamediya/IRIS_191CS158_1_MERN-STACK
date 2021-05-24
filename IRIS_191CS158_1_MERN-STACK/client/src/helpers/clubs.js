import axios from 'axios';
import querystring from "querystring"

const instance = axios.create({
    baseURL: 'http://localhost:8082/',
    port: 8082,
    headers:{
      "Content-Type":'application/x-www-form-urlencoded',
    }
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form- urlencoded';
axios.defaults.crossDomain = true;


export async function getAllClubs(){

    let urlOne = 'http://localhost:8082/clubs/allClubs';
    
    const response = await instance.get(urlOne);
    
    const clubsData = {
        'clubs':response.data.data,
    };
    if(response.data.code === -1)
        clubsData.authenticated = 0;
    else
        clubsData.authenticated = 1;
    return clubsData;
}

export async function getClubDetails(clubName){


    let urlOne = 'http://localhost:8082/clubs/clubDetails';

    const data = {
        'clubName': clubName,
    }
    
    const response = await instance.post(urlOne, querystring.stringify(data));
    
    const clubsData = {
        'club':response.data.data,
    };
    if(response.data.code === 0)
        clubsData.authenticated = 0;
    else
        clubsData.authenticated = 1;
    return clubsData;
}


export async function getClubMemberbyId(objectId){

    let urlOne = 'http://localhost:8082/clubs/member/'+objectId;
  
    const data = {
      'objectId': objectId,
  }
    
    const response = await instance.post(urlOne,querystring.stringify(data));
    
    const membersData = {
        'member':response.data.data,
    };
    console.log(membersData.member);
    if(response.data.code === 0)
        membersData.authenticated = 0;
    else
        membersData.authenticated = 1;
    return membersData;
  }