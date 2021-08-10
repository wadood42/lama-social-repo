import React, { useContext } from "react";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Login.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Messenger from "./Messenger";
import { AuthContext } from "../contexts/auth";
function App() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className='app'>
      <Router>
        <Route
          exact
          path='/'
          render={(props) =>
            user ? <Home {...props} /> : <Login {...props} />
          }
        />

        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Signup />}
        </Route>

        <Route path='/messenger'>{user ? <Messenger /> : <Login />}</Route>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>

        {/* <Route path='/profile/:username' component={Profile} /> */}
      </Router>
    </div>
  );
}

export default App;
