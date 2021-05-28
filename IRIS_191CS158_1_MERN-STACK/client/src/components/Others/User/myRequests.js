import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getItemById } from "../../../helpers/items";
import { getmemberDetails } from "../../../helpers/members";
import { getAllRequestedItemsId } from "../../../helpers/requests";
import UserNav from "../../Navbars/memnav";

const MyRequests = () => {

    const [allRequestedItems, setAllRequestedItems] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [myItems, setMyItems] = useState([]);
    const [reload,setReload] = useState(false);

    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data._id);
            getAllRequestedItemsId(res.data._id).then(data => {
                if(data.authenticated){
                    console.log(data);
                    setAllRequestedItems(data.requestedItems);
                    data.requestedItems.map((item, index) => {
                        getItemById(item._id).then(data =>{
                            if(data.authenticated){
                                console.log(data.item);
                                const arr2 = myItems;
                                arr2[index] = data.item.itemName; 
                                setMyItems(arr2);
                                setReload(true);
                            }
                        })
                    });
                }
            });
            console.log("I am here");
        })
    },[]);

    if(reload){
        setReload(false);
        <Redirect to ="/myRequests"></Redirect>
    }


    return (  
        <div className="myrequests">
            <UserNav />
            <h2 className="mt-5"> Here are my all requests.</h2>
            <div className= "mt-5 mb-5">    
                <div className="table mb-5">
                    <div className="table-header">
                        <div className="row">
                            <div className="column">Item Name</div>
                            <div className="column">Feedback</div>
                            <div className="column">Status</div>
                        </div>
                    </div>
                    <div className="table-body">
                        {allRequestedItems && allRequestedItems.map((request,index) => {
                            return (
                                <div className = "row"  key = {index}>
                                    <div className= "column">{myItems[index]}</div>
                                    <div className= "column">{request.feedback}</div>
                                    <div className="column">{request.permission}</div>
                                </div>
                            );
                        })};
                        {!allRequestedItems && 
                            <div className="text-center">
                                <h2 className="mt-5 text-center">You have requested nothing.</h2>
                            </div>
                        }
                    </div>
                </div>  
            </div>
        </div>
    );
}
 
export default MyRequests;