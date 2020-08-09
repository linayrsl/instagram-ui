import React, {useEffect, useState} from 'react';
import config from "../../config/index";
import Comment from "./Comment/Comment";
import "./PostComments.scss";
import CommentCreate from "./CommentCreate/CommentCreate";

function PostComments(props) {
  const postId = props.postId;
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
    const getComments = async (id, page) => {
      const result = await fetch(`${config.apiUrl}/posts/${id}/comment?page=${page}`, {
        credentials: "include",
      });
      if (result.status === 200) {
        console.log(result);
        setComments([
          ...comments,
          ...await result.json()]);
      }
    };

    getComments(postId, pageNumber);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [postId, pageNumber]);

  return (
    <div className="postComment">
      <div className="comments">
        <div>
          {comments.map(
            comment => <Comment currentUser={props.currentUser} key={comment._id} content={comment.content} user={comment.user} commentDate={comment.createdAt}/>)}
        </div>
        {comments.length === 10 && <button onClick={() => setPageNumber(pageNumber + 1)} type="button" className="btn btn-dark">Load more</button>}
      </div>
      <div className="createComment">
        <CommentCreate onCommentCreate={(comment) => setComments([...comments, comment])} postId={postId}/>
      </div>
    </div>
  );
}

export default PostComments;
