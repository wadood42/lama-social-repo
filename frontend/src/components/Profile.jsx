import React, { useContext } from "react";
import { useFetch } from "../custom_hooks/useFetch";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import Feed from "./Feed";
import { AuthContext } from "../contexts/auth";
import { useParams } from "react-router";

const Profile = ({ match }) => {
  const username = match.params.username;
  // const username = useParams().username;
  console.log("rendering profile");
  // const { data, error, loading } = useFetch(
  //   "/api/users/60f0aef3ff294678dd80f9f6"
  // );

  // if (loading) return <p>Loading...</p>;
  return (
    <div className='profile-container'>
      <Navbar />
      <Sidebar />
      <Feed username={username} />
      <Rightbar />
    </div>
  );
};

export default Profile;
