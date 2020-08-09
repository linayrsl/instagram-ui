import React, {useContext, useState} from 'react';
import {UserContext} from "../context/userContext";
import "./Profile.scss";
import {useParams} from "react-router-dom";
import ProfileUser from "./ProfileUser/ProfileUser";
import Feed from "../Feed/Feed";

function Profile() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  return (
    <div className={"profile container-fluid"}>
      <ProfileUser userId={id} postsNum={posts.length}/>
      <Feed userId={id}/>
    </div>
  );
}

export default Profile;
