import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getClubDetails, getClubMembersbyId } from "../../helpers/clubs";
import { getClubMembers } from "../../helpers/members";

const ClubMembers = () => {
    
    const {id} = useParams();
    const [clubMembers, setClubMembers] = useState([]);
    const [clubDetail, setClubDetail] = useState([]);
    const [clubConvener, setClubConvener] = useState('');
    const [convenerName, setConvenerName] = useState('');

    
    useEffect(() => {
        getClubMembers(id).then(data => {
            if(data.authenticated){
                console.log(data.clMembers);
                setClubMembers(data.clMembers);
            }
        });

        getClubDetails(id).then(data =>{
            if(data.authenticated){
                console.log(data.club);
                console.log(data.club._id);
                setClubDetail(data.club);
            }
        });

        if(clubDetail && clubDetail.convener){
            getClubMembersbyId(clubDetail.convener).then(data => {
                if(data.authenticated){
                    console.log(data.member);
                    setConvenerName(data.member.userName);
                }
            })
        }

    });

    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(clubConvener);
        const temp = clubConvener.split('-');
        const memberId = temp[1];

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
            <h2 className = "text-center mb-5"> All {id} members</h2>
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
                    {clubMembers.map((member,index) => {
                        return(
                            <div className = "row"  key = {index}>
                                <div className= "column">{member.userName}</div>
                                <div className= "column">{member.email}</div>
                                <div className= "column">{member.rollNumber}</div>
                                <div className= "column">{member.contactNumber}</div>   
                            </div>
                        );
                    })}
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
                                            placeholder = {clubDetail.convener}
                                            onChange = {(e) => setClubConvener(e.target.value) } 
                                        >
                                            <option></option>
                                            {clubMembers.map((member,index) => <option key={index}>{member.userName}-{member._id}</option>)}
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