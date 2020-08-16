import React, {useContext, useEffect, useState} from "react";
import config from "../config/index";
import Post from "../common/Post/Post";
import "./Feed.scss";
import {UserContext} from "../context/userContext";
import {PusherEventsContext} from "../context/pusherEventsContext";


function Feed(props) {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const channel = useContext(PusherEventsContext);
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
      }
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, props.userId]);

  useEffect(() => {
    const getPostById = async (postId) => {
      const result = await fetch(`${config.apiUrl}/posts/${postId}`, {
        credentials: "include",
        headers: {
          "Authorization": "Bearer " + user.token}
      });
      if (result.status === 200) {
        setPosts([
          await result.json(),
          ...posts
        ]);
      }
    };
    const addPostHandler = (data) => {
      console.log(data);
      if (data.userId === user._id) {
        return;
      }
      getPostById(data.postId);
    }
    channel.bind("addPosts", addPostHandler);
    return () => {
      channel.unbind("addPosts", addPostHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, posts])

  return (
    <div className="feed container-fluid mt-sm-0 mb-sm-5 mt-4 mb-5">
      {posts.map((post, index) => <Post key={post._id} post={post}/>)}
      {posts.length === 10 && <button onClick={setPageNumber(pageNumber + 1)} type="button">Load more</button>}
    </div>
  );
}

export default Feed;
