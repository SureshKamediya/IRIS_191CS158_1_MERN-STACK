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
import NewItem from './components/Others/User/addItem';
import AllRequests from './components/Others/User/allRequests';
import ClubItems from './components/Others/User/clubItems';
import MemberItems from './components/Others/User/memberItems';
import MyRequests from './components/Others/User/myRequests';
import PartClubMembers from './components/Others/User/partclubMember';
import UserClubItems from './components/Others/User/userclubItems';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path= "/"><Register /></Route>
            <Route path= "/login"><Login /></Route>
            <Route path= "/adminlogin"><AdminLogin /></Route>
            <Route path= "/dashboard/admin"><DashAdmin /></Route>
            <Route path = "/dashboard/convener"><DashConvener /></Route>
            <Route path = "/dashboard/member"><DashMember /></Route>
            <Route path = "/allUsers"><AllUsers /></Route>
            <Route path = "/addClub"><NewClub /></Route>
            <Route path = "/clubMembers/:id"><ClubMembers /></Route>
            <Route path = "/members/:id"><PartClubMembers /></Route>
            <Route path = "/allItems/:id"><ClubItems /></Route>
            <Route path = "/allUserItems/:id"><UserClubItems /></Route>
            <Route path = "/allRequests/:id"><AllRequests /></Route>
            <Route path = "/addItem/:id"><NewItem /></Route>
            <Route path = "/myItems"><MemberItems /></Route>
            <Router path = "/myRequests"><MyRequests /></Router>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
