import { useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';


const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects, setRedirects] = useState(false);
    const [adminId, setAdminId] = useState([]);

     const handleSubmit = (e) => {
        e.preventDefault();
        const admin = {
            email: email,
            password: password,
        };
        setIsPending(true);

        axios
        .post('http://localhost:8082/admins/login', admin)
        .then(res => {
            if(res.data.code){
                console.log("Succesfully Logined");
                setIsPending(false);
                const adminInfo = res.data;
                console.log(adminInfo);
                setAdminId(adminInfo);
                setRedirects(true);  
            }
            else{
                console.log(res.data.message);
            }
        });
     }

     if(!redirects){
         return (  
             <div className="container mt-5">
                 <h1 className="colour">Login</h1>

                 <div className="row">
                     <div className="col-sm-8">
                         <div className="card colour2">
                             <div className="card-body">
                                 <form onSubmit={handleSubmit}>
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
                                     {!isPending && <button>Login</button>}
                                     {isPending && <button disabled>Logging in ..</button>}
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
     else{
         return <Redirect to={"dashboard/admin/"+adminId.data._id}></Redirect>
     }

    
}
    
 
export default AdminLogin;