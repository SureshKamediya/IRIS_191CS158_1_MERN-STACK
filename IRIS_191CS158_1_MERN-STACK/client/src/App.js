import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/authentication/adminlogin';
import Login from './components/authentication/login';
import Register from './components/authentication/signUp';
import DashAdmin from './components/dashboard/admin';
import DashConvener from './components/dashboard/convener';
import DashMember from './components/dashboard/member';
import NewClub from './components/Others/addClub';
import AllUsers from './components/Others/allUsers';
import ClubMembers from './components/Others/clubMembers';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path= "/"><Register /></Route>
            <Route path= "/login"><Login /></Route>
            <Route exact path= "/adminlogin"><AdminLogin /></Route>
            <Route path= "/dashboard/admin"><DashAdmin /></Route>
            <Route path = "/dashboard/convener"><DashConvener /></Route>
            <Route path = "/dashboard/member"><DashMember /></Route>
            <Route path = "/allUsers"><AllUsers /></Route>
            <Route path = "/addClub"><NewClub /></Route>
            <Route path = "/clubMembers/:id"><ClubMembers /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
