import { useState } from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects, setRedirects] = useState(false);

     const handleSubmit = (e) => {
         e.preventDefault();
         const member = {
             userName: userName,
             email: email,
             password: password,
             rollNumber: rollNumber,
             contactNumber: contactNumber,
         };
         setIsPending(true);

          axios
        .post('http://localhost:8082/members/register', member)
         .then(res => {
             console.log(res);
             if(res.data.code){
                 console.log("You are added successfully");
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
            <div className="content backimage">
                <h1 className="text-center mb-5">Welcome to technical clubs</h1>
                <h4 className="text-center">Sign Up</h4>
                <div className="container">               
                    <div className="row">
                        <div className="col-sm-8 mx-auto">
                            <div className="card colour2">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                    type="text" 
                                                    className="form-control" 
                                                    value = {userName}
                                                    onChange = {(e) => setUserName(e.target.value)}
                                                    required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                                <input
                                                    type="email" 
                                                    className="form-control" 
                                                    value = {email}
                                                    onChange = {(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                                <input
                                                    type="password" 
                                                    className="form-control" 
                                                    value = {password}
                                                    onChange = {(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label>Roll No</label>
                                                <input
                                                    type="text" 
                                                    className="form-control" 
                                                    value = {rollNumber}
                                                    onChange = {(e) => setRollNumber(e.target.value)}
                                                    required
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label>Contact Number</label>
                                                <input
                                                    type="text" 
                                                    className="form-control" 
                                                    value = {contactNumber}
                                                    onChange = {(e) => setContactNumber(e.target.value)}
                                                    required
                                                />
                                        </div>
                                        {!isPending && <p className="mb-0 signcent"><button>Register</button></p>}
                                        {isPending && <button disabled>Making your profile...</button>}
                                        <p className="mb-0 text-muted text-center display-5"><Link to="/login">Already have an account</Link></p>
                                        <p className="mb-0 text-muted text-center display-5"><Link to='/adminlogin'>Are you an admin?</Link></p>
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
        return (<Redirect to="/login"></Redirect>);
    }

}
    
 
export default Register;