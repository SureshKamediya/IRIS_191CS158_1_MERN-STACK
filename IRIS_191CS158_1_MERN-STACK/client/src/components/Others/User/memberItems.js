import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getItemById } from "../../../helpers/items";
import { getmemberDetails } from "../../../helpers/members";
import { getMyApprovedItemsId } from "../../../helpers/requests";
import UserNav from "../../Navbars/memnav";

const MemberItems = () => {

    const [approvedItemsId, setApprovedItemsId] = useState([]);
    const [myItems, setMyItems] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data._id);
            getMyApprovedItemsId(res.data._id).then(isdata => {
                if(isdata.authenticated){
                    console.log(isdata);
                    setApprovedItemsId(isdata.approvedItems);
                    console.log(approvedItemsId);
                    if(isdata){
                        isdata.approvedItems.map((item, index) => {
                            getItemById(item._id).then(data =>{
                                if(data.authenticated){
                                    console.log(data.item);
                                    const arr2 = myItems;
                                    arr2[index] = data.item.itemName; 
                                    setMyItems(arr2);
                                    setReload(true);
                                }
                            });
                        });
                    }
                }
            });
            console.log("I am here");
        })
    },[]);

    if(reload){
        setReload(false);
        <Redirect to="/myItems"></Redirect>
    }
    



    return (  
        <div className="memberitems">
            <UserNav />
            <h2 className ="mt-5">Items of a particular member.</h2>
            <div className= "mt-5 mb-5">
                    {myItems && myItems.map((item,index) => {
                        return (    
                            <div key = {index} className="card text-center w-50 mx-auto mt-5 colour2" style={{width: 25 + "rem"}}>
                                <div className="card-body">
                                    <h4 className="card-title">{item}</h4>
                                </div>
                            </div>
                        ); 
                    })}
                    {!myItems&& 
                        <div className="text-center">
                            <h2 className="mt-5 text-center">No Items avilable to me now, go and request some.</h2>
                        </div>
                    }
                </div>
            
        </div>
    );
}
 
export default MemberItems;