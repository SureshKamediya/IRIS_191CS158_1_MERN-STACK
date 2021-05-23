import { useParams } from "react-router";
import AdminNav from "../Navbars/admnav";
import { getClubDetails } from "../../helpers/clubs";
import { getAllClubs } from "../../helpers/clubs"
import { getAllMembers } from "../../helpers/members";
import { useEffect, useState } from "react";
import axios from "axios";



const AllUsers = () => {
    const {id} = useParams();
    const [allMembers,setAllMembers] = useState([]);
    const [allClubs, setAllClubs] = useState([]);
    const [clubValue, setClubValue] = useState([]);
    const [clubMembers, setClubMembers] = useState([]);
    const [memberClub, setMemberClub] = useState([]);

    useEffect(() => {
        getAllMembers().then(data =>{
            if(data.authenticated){
              console.log(data.members);
              setAllMembers(data.members);
            }
        });

        getAllClubs().then(data =>{
            if(data.authenticated){
              console.log(data.clubs);
              setAllClubs(data.clubs);
            }
          });

    },[]);


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
            return member.club;
        }
    }

    const handleClick = index => e => {

        console.log(clubValue[index]);
        const clubToFound = {
            clubName: clubValue[index],
        }
        getClubDetails(clubToFound.clubName).then(data =>{
            if(data.authenticated){
                console.log(data.club);
                console.log(data.club._id);
                setClubMembers(data.club.clubMembersList);
            }
        });
        let member = allMembers[index];
        let arr = clubMembers;
        arr.push(member);
        setClubMembers(arr);
        console.log(clubMembers);

        const urlnow = 'http://localhost:8082/clubs/'+ clubValue[index];
        const club = {
            clubName: clubValue[index],
            clubMembersList : clubMembers,
        }
        axios
        .patch(urlnow,club)
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
        <div className="allusers">
            <AdminNav id ={id} />
            <h2 className = "text-center mb-5"> All Users</h2>
            <div className="table">
                <div className="table-header">
                    <div className="row">
                        <div className="column">Name</div>
                        <div className="column">Email</div>
                        <div className="column">Club</div>
                        <div className="column"></div>
                    </div>
                </div>
                <div className="table-body">
                    {allMembers.map((member,index) => {
                        return(
                            <div className = "row"  key = {index}>
                                <div className= "column">{member.userName}</div>
                                <div className= "column">{member.email}</div>
                                <select className= "column"
                                    value = {tocheck(index, member)}
                                    onChange = {updateClubValue(index,member._id)}
                                >
                                    <option></option>
                                    {allClubs.map((club,index2) => <option key={index2}>{club.clubName}</option>)}
                                </select>
                                <button className="column" onClick = {handleClick(index)}> Add Him </button>
                            </div>
                        );
                    })}
                </div>    
            </div>            
        </div> 
    );
}
 
export default AllUsers;