import React, {useContext, useEffect, useState} from "react";
import config from "../config/index";
import Post from "../common/Post/Post";
import "./Feed.scss";
import {UserContext} from "../context/userContext";



function Feed(props) {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect( () => {
    const getPosts = async () => {
      const result = await fetch(
        `${config.apiUrl}/posts/?sort=-1${props.userId ? '&userId=' + props.userId : ''}&page=${pageNumber}`,
        {
          credentials: "include",
          headers: {
            "Authorization": "Bearer " + user.token}
        });
      if (result.status === 200) {
        setPosts([
          ...posts,
          ...await result.json()
        ]);
        console.log(posts);
      }
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, props.userId]);

  return (
    <div className="feed container-fluid mt-sm-0 mb-sm-5 mt-4 mb-5">
      {posts.map((post, index) => <Post key={index} post={post}/>)}
      {posts.length === 10 && <button onClick={setPageNumber(pageNumber + 1)} type="button">Load more</button>}
    </div>
  );
}

export default Feed;
