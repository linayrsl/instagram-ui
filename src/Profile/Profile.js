import React, {useContext, useEffect, useState} from 'react';
import Avatar from "../Avatar/Avatar";
import {UserContext} from "../context/userContext";
import config from "../config";
import Post from "../Post/Post";


function Profile() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    const getPostsById = async () => {
      const result = await fetch(`${config.apiUrl}/users/${user._id}/posts`, {
        credentials: "include",
      });
      if (result.status === 200) {
        const posts = await result.json();
        setPosts(posts);
      }
    }
    getPostsById();
  }, [user]);


  return (
    <div className={"profile container-fluid"}>
      <div className={"profile-header"}>
        <Avatar image={user.avatar} size={"lg"}/>
      </div>
      <div>
        {posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Profile;
