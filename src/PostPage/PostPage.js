import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import config from "../config/index";
import "./PostPage.scss";
import Date from "../common/Date/Date";
import PostLike from "../PostLike/PostLike";
import {UserContext} from "../context/userContext";
import PostComments from "./PostComments/PostComments";
import Avatar from "../common/Avatar/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import CommentCreate from "./PostComments/CommentCreate/CommentCreate";

function PostPage() {

  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPosts = async() => {
      try {
        const result = await fetch(`${config.apiUrl}/posts/${id}`, {
          credentials: "include"
        });
        setPost(await result.json());
        } catch (error) {
        console.error(error);
        }
      }
    getPosts();
  }, [id]);

  const onLikesChange = (post) => {
    setPost(post);
  }

  return (
    <div className={"postPage container-fluid mt-5"}>
      {post && <div className={"row"}>
          <div className={"postImage col-md-6 mb-4 mb-md-0"}>
            <div className="postImageBody">
              <img src={`${post.image}`}/>
              <div className="d-flex mt-2 align-items-center justify-content-between ml-1">
                <div className="avatarAndDescription align-items-center">
                  <div className="d-flex align-items-center">
                    <Avatar size="sm" image={post.user && post.user.avatar} />
                    <span className="ml-1">{post.user.username}</span>
                  </div>
                  <div className="d-inline-block text-muted mt-1"><Date  date={post} /></div>
                </div>
                <div className="postDetails d-flex">
                  <div aria-label={"number of likes for post"} className={"numOfLikes"}>{post.likes.length}</div>
                  <PostLike post={post} onLikesChange={onLikesChange} isLiked={post.likes.includes(user._id)}/>
                </div>
              </div>
              <div className="ml-1 mt-1">{post.description}</div>
            </div>
            </div>
        <div className="commentsSection col-md-6">
          <PostComments currentUser={user} postId={id} />
        </div>
      </div>}
    </div>
  );
}

export default PostPage;
