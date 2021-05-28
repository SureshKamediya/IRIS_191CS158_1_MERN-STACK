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


export async function getAllRequests(){

    let urlOne = 'http://localhost:8082/requests/allRequests';
    
    const response = await instance.get(urlOne);
    
    const requestsData = {
        'requests':response.data.data,
    };
    if(response.data.code === -1)
        requestsData.authenticated = 0;
    else
        requestsData.authenticated = 1;
    return requestsData;
}

export async function getMyApprovedItemsId(userId){
    console.log(userId);
    let urlOne = 'http://localhost:8082/requests/approvedItems/'+userId;
    
    const response = await instance.get(urlOne);
    
    const approvedData = {
        'approvedItems':response.data.data,
    };
    if(response.data.code === 0)
        approvedData.authenticated = 0;
    else
        approvedData.authenticated = 1;
    return approvedData;
}

export async function getAllRequestedItemsId(userId){
    console.log(userId);
    let urlOne = 'http://localhost:8082/requests/requestedItems/'+userId;
    
    const response = await instance.get(urlOne);
    
    const approvedData = {
        'requestedItems':response.data.data,
    };
    if(response.data.code === 0)
        approvedData.authenticated = 0;
    else
        approvedData.authenticated = 1;
    return approvedData;
}