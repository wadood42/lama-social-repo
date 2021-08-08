import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Videos from "./Videos";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to='/login' />;
  }
  return (
    <Router>
      <Navbar />
      <div className='home-container'>
        <Sidebar />
        <Switch>
          <Route exact path='/' component={Feed} />
          <Route path={`/videos`} component={Videos} />
          <Route path='/profile/:username' component={Profile} />
        </Switch>
        <Rightbar />
      </div>

      {/* <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Signup} />
        <Route path='/profile/:username' component={Profile} />
      </Switch> */}
    </Router>
  );
};

export default Home;
