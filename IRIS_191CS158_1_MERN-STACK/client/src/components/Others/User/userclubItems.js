import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import UserNav from "../../Navbars/memnav";
import {getAllItems} from "../../../helpers/items"
import { NavLink } from "react-router-dom";
import { getmemberDetails } from "../../../helpers/members";
import axios from "axios";

const UserClubItems = () => {
    const {id} = useParams();
    const [allItems, setAllItems] = useState([]);
    const [member, setMember] = useState({});

    useEffect(() =>{

       getAllItems().then(data =>{
        if(data.authenticated){
            console.log(data.items);
            setAllItems(data.items);
            console.log(allItems);
          }
       });
    },[]);

    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            setMember(res.data);
            console.log(member);
            console.log("I am here");
        })
    },[]);


    const handleClick = (item) => (e) => {
        console.log("Are you here or not");
         const request = {
            user : member._id,
            item: item._id,
            club: id,
            permission: 'Awaiting Approval',
            feedback: '',
         };
         
        axios
        .post('http://localhost:8082/requests/addRequest', request)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This Request is added successfully");
            }
            else{
                console.log(res.data.message);
            }
        });
       
    }

        return (  
            <div className="clubitems">
                <UserNav />
                <h2 className="mt-5">List of all items belong to {id} club.</h2>
                <div className= "mt-5 mb-5">
                    {allItems && allItems.map((item,index) => {
                        return ( item.club === id && item.quantity > 0 ?   
                            <div key = {index} className="card text-center w-50 mx-auto mt-5 colour2" style={{width: 25 + "rem"}}>
                                <div className="card-body">
                                    <h4 className="card-title">{item.itemName}</h4>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                    {<button className = "btn btn-primary" onClick = {handleClick(item)}>Request</button>}
                                </div>
                            </div>
                            :<div></div>
                        ); 
                    })}
                </div>
            </div>
        );
}
 
export default UserClubItems;