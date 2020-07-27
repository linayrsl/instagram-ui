import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/userContext";
import config from "../config";
import Post from "../common/Post/Post";
import {
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Profile.scss";
import {Link, useParams} from "react-router-dom";
import ProfileUser from "./ProfileUser/ProfileUser";

function Profile() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect( () => {
    const getPostsById = async () => {
      if (!id) {
        return;
      }
      const result = await fetch(`${config.apiUrl}/users/${id}/posts`, {
        credentials: "include",
      });
      if (result.status === 200) {
        const posts = await result.json();
        setPosts(posts);
      }
    };
    getPostsById();
  }, [id, user]);


  return (
    <div className={"profile container-fluid"}>
      <ProfileUser userId={id} postsNum={posts.length}/>
      <div className="profileBody mt-5">
        {posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Profile;
