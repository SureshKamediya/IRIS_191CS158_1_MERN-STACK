import { useEffect, useState } from 'react';
import {getAllClubs} from '../../helpers/clubs';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import AdminNav from "../Navbars/admnav";

const NewClub = () => {
    const [clubName, setClubName] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects, setRedirects] = useState(false);
    const [allClubs, setAllClubs] = useState([]);

    useEffect(() =>{

       getAllClubs().then(data =>{
        if(data.authenticated){
            console.log(data.clubs);
            setAllClubs(data.clubs);
            console.log(allClubs);
          }
       });

    },[allClubs]);

    const handleSubmit = (e) => {
        e.preventDefault();
         const club = {
            clubName : clubName,
         };
         setIsPending(true);
         
        
        
        axios
        .post('http://localhost:8082/clubs/addClub', club)
        .then(res => {
            console.log(res);
            if(res.data.code){
                console.log("This Club is added successfully");
                setIsPending(false);
                setRedirects(true);
            }
            else{
                console.log(res.data.message);
            }
        });
       
        
    }

    if(!redirects){
        return ( 
            <div className="newClub">
                <AdminNav />
                <div className= "mt-5 mb-5">
                    {allClubs && allClubs.map((club,index) => {
                        return (    
                            <div key = {index} className="card text-center w-50 mx-auto mt-5 colour2" style={{width: 25 + "rem"}}>
                                <div className="card-body">
                                    <h4 className="card-title">{club.clubName}</h4>
                                    <p className="card-text">{club.clubName} is one of the best club in NITK.</p>
                                    <NavLink className = "btn btn-primary" to ={"/clubMembers/"+ club.clubName}>Club Members</NavLink>
                                </div>
                            </div>
                        ); 
                    })}
                    {!allClubs && <div><h2 mt-5>No Clubs till now</h2></div>}
                </div>
                <h4 className="text-center mt-5 mb-2">Add a New Club</h4>
                <div className="container">               
                    <div className="row">
                        <div className="col-sm-8 mx-auto">
                            <div className="card colour2">
                                <div className="card-body">
                                    <form onSubmit = {handleSubmit}>
                                        <div className="form-group">
                                            <label>Club Name</label>
                                            <input 
                                                type = "text"
                                                className = "form-control"
                                                value = {clubName}
                                                onChange = {(e) => setClubName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label>Club Convener</label>
                                            <input 
                                                type = "text"
                                                className = "form-control"
                                                value = {convenerName}
                                                onChange = {(e) => setConvenerName(e.target.value)}
                                            /> 
                                        </div> */}
                                        
                                        {!isPending && <p className="mb-0 signcent"><button>Add Club</button></p>}
                                        {isPending && <button disabled>Adding Club</button>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
    else{
        return <Redirect to={"/dashboard/admin"}></Redirect>
    }
}
 
export default NewClub;