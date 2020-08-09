import React, {useEffect, useState} from "react";
import config from "../config/index";
import Post from "../common/Post/Post";
import "./Feed.scss";



function Feed(props) {

  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect( () => {
    const getPosts = async () => {
      const result = await fetch(
        `${config.apiUrl}/posts?sort=-1${props.userId ? '&userId=' + props.userId : ''}&page=${pageNumber}`,
        {
          credentials: "include",
        });
      if (result.status === 200) {
        const posts = await result.json();
        setPosts(posts);
        console.log(posts);
      }
    }
    getPosts();
  }, [pageNumber, props.userId]);

  return (
    <div className="feed container-fluid mt-sm-0 mb-sm-4 mt-4 mb-5">
      {posts.map((post, index) => <Post key={index} post={post}/>)}
      {posts.length === 10 && <button onClick={setPageNumber(pageNumber + 1)} type="button">Load more</button>}
    </div>
  );
}

export default Feed;
