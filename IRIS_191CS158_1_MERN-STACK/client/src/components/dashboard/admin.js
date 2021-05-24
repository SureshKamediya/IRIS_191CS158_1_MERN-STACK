import {NavLink} from 'react-router-dom';
import AdminNav from '../Navbars/admnav';

const DashAdmin = () => {
    

    
     



    

    


    return (  
        <div className="dashadmin">
            <AdminNav />              
            <h2 className ="mt-5 text-center">This is the admin page.</h2>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">About All Users</h5>
                    <p className="card-text">You can see all users and can put them into the specific club.</p>
                    <NavLink className = "btn btn-primary" to={"/allUsers"}>Users</NavLink>
                </div>
            </div>
            <div className="card text-center mt-5 mb-5 mx-auto" style={{width: 18 + "rem"}}>
                <div className="card-body">
                    <h5 className="card-title">About All Clubs</h5>
                    <p className="card-text">You can see info about all clubs and can add a new club.</p>
                    <NavLink className = "btn btn-primary" to={"/addClub"}>Clubs</NavLink>
                </div>
            </div>
        </div>
    );
}
 
export default DashAdmin;