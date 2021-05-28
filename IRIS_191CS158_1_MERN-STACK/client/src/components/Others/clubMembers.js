import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { getClubDetails} from "../../helpers/clubs";
import { getClubMembers } from "../../helpers/members";
import AdminNav from "../Navbars/admnav";

const ClubMembers = () => {
    
    const {id} = useParams();
    const [clubMembers, setClubMembers] = useState([]);
    const [clubDetail, setClubDetail] = useState({});
    const [clubConvener, setClubConvener] = useState('');
    const [reload, setReload] = useState(false);

    
    useEffect(() => {
        getClubMembers(id).then(data => {
            if(data.authenticated){
                console.log(data.clMembers);
                setClubMembers(data.clMembers);
            }
        });
    },[]);

    useEffect(() => {
        getClubDetails(id).then(data =>{
            if(data.authenticated){
                console.log(data.club);
                console.log(data.club._id);
                setClubDetail(data.club);
                console.log(clubDetail);
            }
        });
    },[]);


    const tocheck = (clubConvener, conv) =>{
        if(conv){
            if(clubConvener !== ''){
                return clubConvener;
            }
            else{
                return conv;
            }
        }
        else{
            return clubConvener;
        }
    }
    

    
     const handleSubmit = (e) => {
        e.preventDefault();
        if(clubDetail.convener){
            const urlnow = 'http://localhost:8082/members/'+ clubDetail.convener;
            const memberdata = {
                club: id,
                convener:false,
            }
            axios
            .patch(urlnow,memberdata)
            .then(res => {
                console.log(res);
                if(res.data.code){
                    console.log("He is removed from convener post.");
                    setReload(true);
                }
                else{
                    console.log(res.data.message);
                }
            });
        }


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
                setReload(true);
            }
            else{
                console.log(res.data.message);
            }
        });
        setReload(false);
     }

     if(reload){
         <Redirect to ={"/clubMembers/"+id}></Redirect>
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
                                        <label>Convener</label>
                                        <select
                                            name = "clubobject"
                                            className = "form-control"
                                            value = {tocheck(clubConvener, clubDetail.convener)} 
                                            placeholder = {clubDetail.convener}
                                            onChange = {(e) => setClubConvener(e.target.value) } 
                                        >
                                            <option></option>
                                            {clubMembers && clubMembers.map((member,index) => <option key={index} value = {member._id}>{member.userName}-{member.email}</option>)}
                                        </select>
                                    </div>
                                    <button className="mb-0 mx-auto">Change Convener</button>
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