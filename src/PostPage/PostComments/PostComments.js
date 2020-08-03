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
    <div className="postComment">
      <div className="comments">
        <div>
          {comments.map(
            comment => <Comment currentUser={props.currentUser} key={comment._id} content={comment.content} user={comment.user} commentDate={comment.createdAt}/>)}
        </div>
      </div>
      <div className="createComment">
        <CommentCreate onCommentCreate={(comment) => setComments([...comments, comment])} postId={postId}/>
      </div>
    </div>
  );
}

export default PostComments;
