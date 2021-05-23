import { Link} from "react-router-dom";


const AdminNav = ({id}) => {
    return (  
        <div className="adminnav">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to={"/dashboard/admin/"+id}>Tech Clubs</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className= "nav-item "><Link className="nav-link active" to={"/allUsers/"+id}>Users</Link></li>
                            <li className= "nav-item "><Link className="nav-link" to={"/addClub/"+id}>Add Club</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {id}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Profile</a>
                        <a className="dropdown-item" href="#">Change Password</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Log Out</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
 
export default AdminNav;