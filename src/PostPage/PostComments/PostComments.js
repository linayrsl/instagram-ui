import React, {useContext, useEffect, useState} from 'react';
import config from "../../config/index";
import Comment from "./Comment/Comment";
import "./PostComments.scss";
import CommentCreate from "./CommentCreate/CommentCreate";
import {UserContext} from "../../context/userContext";
import {PusherEventsContext} from "../../context/pusherEventsContext";

function PostComments(props) {
  const postId = props.postId;
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const channel = useContext(PusherEventsContext);


  useEffect(() => {
    const getComments = async (id, page) => {
      const result = await fetch(`${config.apiUrl}/posts/${id}/comment?page=${page}`, {
        credentials: "include",
        headers: {
          "Authorization": "Bearer " + user.token}
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


  useEffect(() => {
    const getCommentById = async (postId, commentId) => {
      const result = await fetch(`${config.apiUrl}/posts/${postId}/comment/${commentId}`, {
        credentials: "include",
        headers: {
          "Authorization": "Bearer " + user.token}
      });
      if (result.status === 200) {
        setComments([
          await result.json(),
          ...comments,
        ]);
      }
    };

    const showCommentHandler = (data) => {
      if (data.userId === user._id) {
        return;
      }
      getCommentById(data.postId, data.commentId);
    }
    channel.bind("addComment", showCommentHandler);
    return () => {
      channel.unbind("addComment", showCommentHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, comments])

  return (
    <div className="postComment">
      <div className="comments">
        <div>
          {comments.map(
            comment => <Comment currentUser={props.currentUser} key={comment._id} content={comment.content} user={comment.user} commentDate={comment}/>)}
        </div>
        {comments.length === 10 && <button onClick={() => setPageNumber(pageNumber + 1)} type="button" className="btn btn-dark">Load more</button>}
      </div>
      <div className="createComment">
        <CommentCreate onCommentCreate={(comment) => setComments([comment, ...comments])} postId={postId}/>
      </div>
    </div>
  );
}

export default PostComments;
