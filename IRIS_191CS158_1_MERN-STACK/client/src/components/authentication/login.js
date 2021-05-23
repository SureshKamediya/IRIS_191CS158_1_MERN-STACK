import { useState } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects1, setRedirects1] = useState(false);
    const [redirects2, setRedirects2] = useState(false);
    const [memberId, setMemberId] = useState([]);

     const handleSubmit = (e) => {
        e.preventDefault();
        const member = {
            email: email,
            password: password,
        };
        setIsPending(true);

        axios
        .post('http://localhost:8082/members/login', member)
        .then(res => {
            if(res.data.code){
                console.log("Succesfully Logined");
                setIsPending(false);
                const memberInfo = res.data;
                setMemberId(memberInfo);
                console.log(memberId);
                if(memberInfo.convener === true){
                    setRedirects1(true);
                }
                else{
                    setRedirects2(true);
                }
            }
            else{
                console.log(res.data.message);
            }
        });
     }

     if(!(redirects1 || redirects2)){
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
     else if(redirects1){
         return <Redirect to={"dashboard/convener/"+memberId.data._id}></Redirect>
     }
     else{
         return <Redirect to={"dashboard/member/"+memberId.data._id}></Redirect>
     }

    
}
    
 
export default Login;