import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import UserNav from "../../Navbars/memnav";
import {getAllItems} from "../../../helpers/items"
import { NavLink } from "react-router-dom";
import { getmemberDetails } from "../../../helpers/members";
import axios from "axios";

const ClubItems = () => {
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
    },[member]);


        return (  
            <div className="clubitems">
                <UserNav />
                <h2 className="mt-5">List of all items belong to {id} club.</h2>
                <div className= "mt-5 mb-5">
                    {allItems && allItems.map((item,index) => {
                        return ( item.club === id ?  
                            <div key = {index} className="card text-center w-50 mx-auto mt-5 colour2" style={{width: 25 + "rem"}}>
                                <div className="card-body">
                                    <h4 className="card-title">{item.itemName}</h4>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                            :<div></div>
                        ); 
                    })}
                    {!allItems && 
                        <div className="text-center">
                            <h2 className="mt-5 text-center">No Items avilable in this club</h2>
                            <NavLink className ="btn btn-primary" to={"/addItem/"+id}>Add Some Item</NavLink>
                        </div>
                    }
                </div>
            </div>
        );
}
 
export default ClubItems;