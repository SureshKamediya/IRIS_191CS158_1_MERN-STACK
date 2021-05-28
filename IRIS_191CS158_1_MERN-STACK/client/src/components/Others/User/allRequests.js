import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { getClubMemberbyId } from "../../../helpers/clubs";
import { getItemById } from "../../../helpers/items";
import { getAllRequests } from "../../../helpers/requests";
import ConvNav from "../../Navbars/convnav";

const AllRequests = () => {
    const {id} = useParams();
    const [allRequests, setAllRequests] = useState([]);
    const [memberInfo, setMemberInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [feedback,setFeedback] = useState([]);
    const [quantityInfo, setQuantityInfo] = useState([]);
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
                        arr2[index] = data.item.itemName+ "-" +data.item.quantity;
                        const arr3 = quantityInfo;
                        arr3[index] = data.item.quantity; 
                        setItemInfo(arr2);
                        setQuantityInfo(arr3);
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

     const updateFeedback = (index) => (e) => {
         const arr4 = feedback;
         arr4[index] = e.target.value;
         setFeedback(arr4);
     }

     const updateStatus = (requests,index) =>(e) => {
        const request = {
            feedback: feedback[index],
            permission: e.target.value,
        }
        let value = Number(quantityInfo[index]);
        console.log(value);
        if(request.permission === "Approve"){
            value = value-1;
        }
        console.log(value);
        const item = {
            quantity: Number(value),
        }

        const urlfirst = 'http://localhost:8082/requests/'+ requests._id;
        const urlsecond = 'http://localhost:8082/items/item/'+ requests.item;

        const requestOne = axios.patch(urlfirst,request);
        const requestTwo = axios.patch(urlsecond,item);
        
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses)=> {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            if(responseOne.data.code){
                console.log("The status of the request has been changed.");
            }
            if(responseTwo.data.code){
                console.log("The qunatity is updated.");
            }
        })).catch(errors => {
            console.log(errors);
        });
        <Redirect to ={"/allRequests/"+id}></Redirect>

        setReload(true);
     }

    if(reload){
        setReload(false);
        <Redirect to={"/allRequests/"+id}></Redirect>
    }

     

    return (  
        <div className="allrequests">
            <ConvNav />
            <h2 className="mt-5">All requests belong to {id} club is here. </h2>
            <div className= "mt-5 mb-5">    
                <div className="table mb-5">
                    <div className="table-header">
                        <div className="row">
                            <div className="column">User</div>
                            <div className="column">Item-Quantity</div>
                            <div className="column">Feedback</div>
                            <div className="column"></div>
                        </div>
                    </div>
                    <div className="table-body">
                        {allRequests && allRequests.map((request,index) => {
                            return ( request.club === id && request.permission === "Awaiting Approval"?
                                <div className = "row"  key = {request._id}>
                                    <div className= "column">{memberInfo[index]}</div>
                                    <div className= "column">{itemInfo[index]}</div>
                                    <input 
                                        type ="text"
                                        className = "column"
                                        value = {feedback[index]}
                                        onChange = {updateFeedback(index)}
                                    />
                                    <select
                                        className = "column"
                                        onChange  = {updateStatus(request,index)}
                                    >
                                        <option>Awaiting Approval</option>
                                        <option>Approve</option>
                                        <option>Reject</option>
                                    </select>   
                                </div>
                                : <div></div>
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
 
export default AllRequests;