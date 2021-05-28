import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getClubMemberbyId } from "../../helpers/clubs";
import { getItemById } from "../../helpers/items";
import { getAllRequests } from "../../helpers/requests";
import AdminNav from "../Navbars/admnav";

const AllTheRequests = () => {

    const [allRequests, setAllRequests] = useState([]);
    const [memberInfo, setMemberInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getAllRequests().then(isdata =>{
        if(isdata.authenticated){
            console.log(isdata.requests);
            setAllRequests(isdata.requests);

            isdata.requests.map((request, index) => {
                getItemById(request.item).then(data =>{
                    if(data.authenticated){
                        console.log(data.item);
                        // const value1 = data.item.itemName + " - "+ data.item.quantity;
                        // const value2 = data.item.quantity;
                        // setItemInfo(...itemInfo,value1);
                        // setQuantityInfo(...quantityInfo,value2);
                        const arr2 = itemInfo;
                        arr2[index] = data.item.itemName; 
                        setItemInfo(arr2);
                        setReload(true);
                    }
                });
            });


            isdata.requests.map((request, index) => {
                getClubMemberbyId(request.user).then(data => {
                    if(data.authenticated){
                        console.log(data.member);
                        // const value3= data.member.userName + " - " + data.member.email;
                        // setMemberInfo(...memberInfo,value3);
                        const arr4 = memberInfo;
                        arr4[index] = data.member.userName + " - " + data.member.email;
                        setMemberInfo(arr4);
                        setReload(true);
                    }
                });
            });
        }
        });
     },[]);

     if(reload){
        setReload(false);
        <Redirect to={"/allTheRequests"}></Redirect>
    }

    return (  
        <div className="alltherequests">
            <AdminNav />
            <h2 className="mt-5">All requests are here</h2>
            <div className= "mt-5 mb-5">    
                <div className="table mb-5">
                    <div className="table-header">
                        <div className="row">
                            <div className="column">User</div>
                            <div className="column">Item</div>
                            <div className="column">Feedback</div>
                            <div className="column">Status</div>
                        </div>
                    </div>
                    <div className="table-body">
                        {allRequests && allRequests.map((request,index) => {
                            return (
                                <div className = "row"  key = {request._id}>
                                    <div className= "column">{memberInfo[index]}</div>
                                    <div className= "column">{itemInfo[index]}</div>
                                    <div className="column">{request.feedback}</div>
                                    <div className="column">{request.permission}</div>
                                </div>
                            );
                        })};
                        {!allRequests && 
                            <div className="text-center">
                                <h2 className="mt-5 text-center">No Requests are there in this club</h2>
                            </div>
                        }
                    </div>
                </div>  
            </div>
        </div>
    );
}
 
export default AllTheRequests;