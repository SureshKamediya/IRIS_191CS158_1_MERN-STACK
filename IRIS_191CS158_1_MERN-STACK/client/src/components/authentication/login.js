import { useState } from "react";
import {Redirect} from 'react-router-dom';
import { login } from "../../helpers/members";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [redirects1, setRedirects1] = useState(false);
    const [redirects2, setRedirects2] = useState(false);

     const handleSubmit = (e) => {
        e.preventDefault();
        const member = {
            email: email,
            password: password,
        };
        setIsPending(true);

        
        login(member.email, member.password).then(res => {
            if(res.code){
                console.log("Succesfully Logined");
                setIsPending(false);
                console.log(res.data);
                const memberInfo = res.data.member;
                // setMemberId(memberInfo._id);
                // console.log(memberId);
                if(memberInfo.convener === true){
                    setRedirects1(true);
                }
                else{
                    setRedirects2(true);
                }
            }
            else{
                console.log(res.message);
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
         return <Redirect to={"dashboard/convener"}></Redirect>
     }
     else{
         return <Redirect to={"dashboard/member"}></Redirect>
     }

    
}
    
 
export default Login;