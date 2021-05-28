import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/authentication/adminlogin';
import Login from './components/authentication/login';
import Register from './components/authentication/signUp';
import DashAdmin from './components/dashboard/admin';
import DashConvener from './components/dashboard/convener';
import DashMember from './components/dashboard/member';
import NewClub from './components/Others/addClub';
import AllTheRequests from './components/Others/allTheRequests';
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
            <Route exact path= "/login"><Login /></Route>
            <Route exact path= "/adminlogin"><AdminLogin /></Route>
            <Route exact path= "/dashboard/admin"><DashAdmin /></Route>
            <Route exact path = "/dashboard/convener"><DashConvener /></Route>
            <Route exact path = "/dashboard/member"><DashMember /></Route>
            <Route exact path = "/allUsers"><AllUsers /></Route>
            <Route exact path = "/allTheRequests"><AllTheRequests /></Route>
            <Route exact path = "/addClub"><NewClub /></Route>
            <Route path = "/clubMembers/:id"><ClubMembers /></Route>
            <Route path = "/members/:id"><PartClubMembers /></Route>
            <Route path = "/allItems/:id"><ClubItems /></Route>
            <Route path = "/allUserItems/:id"><UserClubItems /></Route>
            <Route path = "/allRequests/:id"><AllRequests /></Route>
            <Router exact path = "/myRequests"><MyRequests /></Router>
            <Route exact path = "/myItems"><MemberItems /></Route>
            <Route path = "/addItem/:id"><NewItem /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
