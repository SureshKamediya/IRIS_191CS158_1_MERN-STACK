import AdminNav from "../Navbars/admnav";
import { getAllClubs } from "../../helpers/clubs"
import { getAllMembers } from "../../helpers/members";
import { useEffect, useState } from "react";
import axios from "axios";



const AllUsers = () => {
    const [allMembers,setAllMembers] = useState([]);
    const [allClubs, setAllClubs] = useState([]);
    const [clubValue, setClubValue] = useState([]);
    const [memberClub, setMemberClub] = useState([]);

    useEffect(() => {
        getAllMembers().then(data =>{
            if(data.authenticated){
              console.log(data.members);
              setAllMembers(data.members);
            }
        });
    },[allMembers]);

    useEffect(()=> {
        getAllClubs().then(data =>{
            if(data.authenticated){
              console.log(data.clubs);
              setAllClubs(data.clubs);
            }
          });
    },[allClubs]);


    const updateClubValue = (index,memberId) => e => {
        let newArr = clubValue;
        newArr[index] = e.target.value;
        setClubValue(newArr);
        console.log(clubValue[index]);

        const urlnow = 'http://localhost:8082/members/'+ memberId;
        const member = {
            club: clubValue[index],
        }
        axios
        .patch(urlnow,member)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This Club of the Member is changed respectively");
                const newarray = memberClub;
                newarray[index] = clubValue[index];
                setMemberClub(newarray);
            }
            else{
                console.log(res.data.message);
            }
        });
    }

    const tocheck = (index, member) =>{
        if(member.club === ''){
            return clubValue[index];
        }
        else{
            if(clubValue[index]){
                return clubValue[index];
            }
            else{
                return member.club;
            }
        }
    }

    return (
        <div className="allusers">
            <AdminNav />
            <h2 className = "text-center mb-5"> All Users</h2>
            <div className="table">
                <div className="table-header">
                    <div className="row">
                        <div className="column">Name</div>
                        <div className="column">Email</div>
                        <div className="column">Contact Number</div>
                        <div className="column">Club</div>
                    </div>
                </div>
                <div className="table-body">
                    {allMembers && allMembers.map((member,index) => {
                        return(
                            <div className = "row"  key = {index}>
                                <div className= "column">{member.userName}</div>
                                <div className= "column">{member.email}</div>
                                <div className="column">{member.contactNumber}</div>
                                <select className= "column"
                                    value = {tocheck(index,member)}
                                    onChange = {updateClubValue(index,member._id)}
                                >
                                    <option></option>
                                    {allClubs && allClubs.map((club,index2) => <option key={index2}>{club.clubName}</option>)}
                                </select>
                            </div>
                        );
                    })}
                    {!allMembers && <div><h2>No user has registered till now</h2></div>}
                </div>    
            </div>            
        </div> 
    );
}
 
export default AllUsers;