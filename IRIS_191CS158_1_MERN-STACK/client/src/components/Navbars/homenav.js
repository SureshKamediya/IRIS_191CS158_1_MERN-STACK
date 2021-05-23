import { Link} from "react-router-dom";


const HomeNav = () => {
    return (  
        <div className="homenav">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">Tech Clubs</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className= "nav-item "><Link className="nav-link active" to="/">Home</Link></li>
                            <li className= "nav-item "><Link className="nav-link" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-right">
                        <li className= "nav-item glyphicon glyphicon-user"><Link className="nav-link " to="/signUp">Sign Up</Link></li>
                        <li className= "nav-item glyphicon glyphicon-log-in"><Link className="nav-link" to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
 
export default HomeNav;