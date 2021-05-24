import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getClubDetails, getClubMemberbyId } from "../../helpers/clubs";
import { getClubMembers } from "../../helpers/members";
import AdminNav from "../Navbars/admnav";

const ClubMembers = () => {
    
    const {id} = useParams();
    const [clubMembers, setClubMembers] = useState([]);
    const [clubDetail, setClubDetail] = useState({});
    const [clubConvener, setClubConvener] = useState('');
    const [convenerName, setConvenerName] = useState('');

    
    useEffect(() => {
        getClubMembers(id).then(data => {
            if(data.authenticated){
                console.log(data.clMembers);
                setClubMembers(data.clMembers);
            }
        });
    },[id, clubMembers]);

    useEffect(() => {
        getClubDetails(id).then(data =>{
            if(data.authenticated){
                console.log(data.club);
                console.log(data.club._id);
                setClubDetail(data.club);
                console.log(clubDetail);
            }
        });
    },[id,clubDetail]);

    useEffect(() => {
        if(clubDetail && clubDetail.convener){
            getClubMemberbyId(clubDetail.convener).then(data => {
                if(data.authenticated){
                    console.log(data.member);
                    setConvenerName(data.member.userName);
                }
            })
        }
    },[clubDetail, convenerName]);
    

    
     const handleSubmit = (e) => {
         e.preventDefault();
         console.log(clubConvener);
         const memberId = clubConvener;

        const urlnow = 'http://localhost:8082/members/convener/'+ memberId;

        const member = {
            convener: true,
        }
        axios
        .patch(urlnow,member)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This role of the Member is changed respectively");
            }
            else{
                console.log(res.data.message);
            }
        });
        const urlsecond = 'http://localhost:8082/clubs/convener/'+ id;
        const club = {
            clubName: id,
            convener: memberId,
        }

        axios
        .patch(urlsecond,club)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This Club details are updated successfully");
            }
            else{
                console.log(res.data.message);
            }
        });
     }


    return (  
        <div className="clubmembers">
            <AdminNav />
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
            <div className="container">               
                <div className="row">
                    <div className="col-sm-8 mx-auto">
                        <div className="card colour2">
                            <div className="card-body">
                                <form onSubmit ={handleSubmit}>
                                    <div className="form-group">
                                        <label>Club Convener - {convenerName}</label>
                                        <select
                                            name = "clubobject"
                                            className = "form-control"
                                            value = {clubConvener} 
                                            placeholder = {clubDetail.convener}
                                            onChange = {(e) => setClubConvener(e.target.value) } 
                                        >
                                            <option></option>
                                            {clubMembers && clubMembers.map((member,index) => <option key={index} value = {member._id}>{member.userName}-{member.email}</option>)}
                                        </select>
                                    </div>
                                    <button className="mb-0 mx-auto">Add Convener</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
    );
}
 
export default ClubMembers;