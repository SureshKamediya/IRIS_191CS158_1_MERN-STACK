import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getClubMembers } from "../../../helpers/members";
import UserNav from "../../Navbars/memnav";

const PartClubMembers = () => {
    const {id} = useParams();
    const [clubMembers, setClubMembers] = useState([]);
    useEffect(() => {
        getClubMembers(id).then(data => {
            if(data.authenticated){
                console.log(data.clMembers);
                setClubMembers(data.clMembers);
            }
        });
    },[]);


    return (  
        <div className="partclubmembers">
            <UserNav />
            <h2 className = "text-center mt-5 mb-5"> All {id} members</h2>
            <div className="table mb-5">
                <div className="table-header">
                    <div className="row">
                        <div className="column">Name</div>
                        <div className="column">Email</div>
                        <div className="column">Roll No</div>
                        <div className="column">Contact Number</div>
                    </div>
                </div>
                <div className="table-body">
                    {clubMembers && clubMembers.map((member,index) => {
                        return(
                            <div className = "row"  key = {index}>
                                <div className= "column">{member.userName}</div>
                                <div className= "column">{member.email}</div>
                                <div className= "column">{member.rollNumber}</div>
                                <div className= "column">{member.contactNumber}</div>   
                            </div>
                        );
                    })}
                    {!clubMembers && <div><h2>No members in this club till now</h2></div>}
                </div>
            </div>
        </div>
    );
}
 
export default PartClubMembers;
