import React, {useEffect, useState} from "react";
import config from "../config/index";
import Post from "../Post/Post";
import "./Feed.scss";


function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect( () => {
    const getPosts = async () => {
      const result = await fetch(`${config.apiUrl}/posts`, {
        credentials: "include",
      });
      if (result.status === 200) {
        const posts = await result.json();
        setPosts(posts);
        console.log(posts);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="feed container-fluid mt-sm-0 mt-4 mb-4">
      {posts.map((post, index) => <Post key={index} post={post}/>)}
    </div>
  );
}

export default Feed;
