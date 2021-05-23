import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import AdminNav from "../Navbars/admnav";
import { getAllClubs } from "../../helpers/clubs";

const NewClub = () => {
    const {id} = useParams();
    const [clubName, setClubName] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects, setRedirects] = useState(false);

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
                <AdminNav id={id} />
                <h4 className="text-center mt-5 mb-5">Add a New Club</h4>
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
        return <Redirect to={"/dashboard/admin/"+id}></Redirect>
    }
}
 
export default NewClub;