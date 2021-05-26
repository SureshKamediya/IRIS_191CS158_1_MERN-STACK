import axios from 'axios';
import querystring from 'querystring';

const instance = axios.create({
    baseURL: 'http://localhost:8082/',
    port: 8082,
    headers:{
      "Content-Type":'application/x-www-form-urlencoded',
    }
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form- urlencoded';
axios.defaults.crossDomain = true;


export async function getAllItems(){

    let urlOne = 'http://localhost:8082/items/allItems';
    
    const response = await instance.get(urlOne);
    
    const itemsData = {
        'items':response.data.data,
    };
    if(response.data.code === -1)
        itemsData.authenticated = 0;
    else
        itemsData.authenticated = 1;
    return itemsData;
}

export async function getItemById(ItemId){

    let urlOne = 'http://localhost:8082/items/'+ItemId;
  
    const data = {
      'ItemId': ItemId,
    }
    
    const response = await instance.post(urlOne,querystring.stringify(data));
    
    const itemsData = {
        'item':response.data.data,
    };
    console.log(itemsData.item);
    if(response.data.code === 0)
        itemsData.authenticated = 0;
    else
        itemsData.authenticated = 1;
    return itemsData;
  }

 