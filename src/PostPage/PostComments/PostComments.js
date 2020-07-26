import React, {useEffect, useState} from 'react';
import config from "../../config/index";
import Comment from "./Comment/Comment";
import "./PostComments.scss";
import CommentCreate from "./CommentCreate/CommentCreate";

function PostComments(props) {
  const postId = props.postId;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const result = await fetch(`${config.apiUrl}/posts/${postId}/comment`, {
        credentials: "include",
      });
      if (result.status === 200) {
        console.log(result);
        setComments(await result.json());
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="postComment  mt-sm-0 mt-4">
      <div className="comments col-sm-6">
        <h5 >Comments:</h5>
        <div>
          {comments.map(comment => <Comment key={comment._id} content={comment.content} />)}
        </div>
      </div>
      <ul className="createComment col-sm-6">
        <CommentCreate onCommentCreate={(comment) => setComments([...comments, comment])} postId={postId} />
      </ul>
    </div>
  );
}

export default PostComments;
