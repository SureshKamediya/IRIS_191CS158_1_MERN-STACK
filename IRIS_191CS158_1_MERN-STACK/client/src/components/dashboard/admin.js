import {NavLink, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getAllMembers} from '../../helpers/members';
import {getAllClubs, getClubMembersbyId} from '../../helpers/clubs';
import AdminNav from '../Navbars/admnav';

const DashAdmin = () => {
    const {id} = useParams();
    const [allMembers,setAllMembers] = useState([]);
    const [allClubs, setAllClubs] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [convenerName,setConvenerName] = useState([]);

    useEffect(() =>{
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
            console.log(allClubs);
            if(allClubs){
                setIsEmpty(false);
            }
            console.log(isEmpty);
          }
       });

       allClubs.map((club,index) => {
        if(club.convener){
            return(
                getClubMembersbyId(club.convener).then(data => {
                    if(data.authenticated){
                        console.log(data.member);
                        const arr = convenerName;
                        arr[index] = data.member.userName;
                        setConvenerName(arr);
                    }
                })
            );
        }
    });

    });



    

    


    return (  
        <div className="dashadmin">
            <AdminNav id = {id}/>
            <h2>This is the admin page.</h2>
            {allClubs.map((club,index) => {
                return (    
                    <div key = {index} className="card text-center w-50 mx-auto mt-5 colour2">
                        <div className="card-body">
                            <h4 className="card-title">{club.clubName}</h4>
                            <h5 className="card-text">Club convener: {convenerName[index]}</h5>
                            <NavLink className = "btn btn-primary" to ={"/clubMembers/"+ club.clubName}>Club Members</NavLink>
                        </div>
                    </div>
                ); 
            })}
        </div>
    );
}
 
export default DashAdmin;