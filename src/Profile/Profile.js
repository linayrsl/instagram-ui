import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import ProfileUser from "./ProfileUser/ProfileUser";
import Feed from "../Feed/Feed";
import "./Profile.scss";

function Profile() {
  const [posts] = useState([]);
  const { id } = useParams();

  return (
    <div className={"profile container-fluid"}>
      <ProfileUser userId={id} postsNum={posts.length}/>
      <Feed userId={id}/>
    </div>
  );
}

export default Profile;
