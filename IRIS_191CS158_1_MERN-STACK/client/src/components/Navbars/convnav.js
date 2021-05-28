import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { getmemberDetails, logout } from "../../helpers/members";


const ConvNav = () => {

    const [member, setMember] = useState({});
    useEffect(() => {
        getmemberDetails().then(res => {
            console.log(res);
            setMember(res.data);
            console.log(member);
            console.log("I am here");
        })
    },[]);

    const onLogout = (e) =>{
        logout().then(response=>{
            console.log(response);
            console.log("You are going to logout");
            console.log(response.message);
        });
      }
    
    return (  
        <div className="membernav">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to={"/dashboard/convener"}>Tech Clubs/Dashboard</Link>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-right">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {member.userName}
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick = {(e) => onLogout(e)}>Log Out</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
 
export default ConvNav;