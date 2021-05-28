import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getmemberDetails } from "../../helpers/members";
import ConvNav from "../Navbars/convnav"; 

const DashConvener = () => {

    
    const [convener, setConvener] = useState({});
    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            setConvener(res.data);
            console.log(convener);
            console.log("I am here");
        })
    },[]);

    return (  
        <div className="dashconvener">
            <ConvNav />              
            <h2 className ="mt-5 text-center">This is the convener page of {convener.club} club</h2>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">All Club Members</h5>
                    <p className="card-text">You can see all users of {convener.club} club.</p>
                    <NavLink className = "btn btn-primary" to={"/members/"+convener.club}>All Club Members</NavLink>
                </div>
            </div>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">About All Items</h5>
                    <p className="card-text">You can see info about all items present in {convener.club} club</p>
                    <NavLink className = "btn btn-primary" to={"/allItems/"+convener.club}>All Items</NavLink>
                </div>
            </div>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">All Requests</h5>
                    <p className="card-text">You can see info about all requests of items in {convener.club} club</p>
                    <NavLink className = "btn btn-primary" to={"/allRequests/"+convener.club}>All Requests</NavLink>
                </div>
            </div>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Add Item</h5>
                    <p className="card-text">You can add an item in  {convener.club} club</p>
                    <NavLink className = "btn btn-primary" to={"/addItem/"+convener.club}>Add Item</NavLink>
                </div>
            </div>
        </div>
    );
}
 
export default DashConvener;