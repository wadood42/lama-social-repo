import React, { useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { Redirect } from "react-router-dom";
const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to='/login' />;
  }
  return (
    <>
      <Navbar />
      <div className='home-container'>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>

      {/* <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Signup} />
        <Route path='/profile/:username' component={Profile} />
      </Switch> */}
    </>
  );
};

export default Home;
