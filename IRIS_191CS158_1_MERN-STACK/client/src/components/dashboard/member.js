import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getmemberDetails } from "../../helpers/members";
import UserNav from "../Navbars/memnav";

const DashMember = () => {
    const [member, setMember] = useState({});
    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            setMember(res.data);
            console.log(member);
            console.log("I am here");
        })
    },[member]);

    if(member.club !== ''){
        return (  
            <div className="dashmember">
                <UserNav/>              
                <h2 className ="mt-5 text-center">This is the member page of {member.userName} in {member.club} club</h2>
                <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">About All Items</h5>
                        <p className="card-text">You can see info about all items present in {member.club} club</p>
                        <NavLink className = "btn btn-primary" to={"/allUserItems/"+member.club}>Clubs</NavLink>
                    </div>
                </div>
                <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">My Items</h5>
                        <p className="card-text">Here are my Items which I have taken from {member.club} club.</p>
                        <NavLink className = "btn btn-primary" to={"/myItems"}>My Items</NavLink>
                    </div>
                </div>
                <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">My Requests</h5>
                        <p className="card-text">Here are my requests for the items which I have asked from convener of {member.club} club</p>
                        <NavLink className = "btn btn-primary" to={"/myRequests"}>My Requests</NavLink>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return( 
            <div>
                <UserNav />
                <h2 className="mt-5 text-center">You are not the member of any club till now</h2>
            </div>
        );
    }
    
}
 
export default DashMember;