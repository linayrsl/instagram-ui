import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import config from "../config/index";
import "./PostLike.scss";
import {UserContext} from "../context/userContext";

function PostLike(props) {

  const { user } = useContext(UserContext);
  const isLiked = props.isLiked;


  const getLikes = async() => {
    const response = await fetch(`${config.apiUrl}/posts/${props.post._id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 409) {
      // TODO: show error message
    }
    if (response.status === 200) {
      props.onLikesChange(await response.json());
      // setPost(await response.json());
    }
  }

  const removeLikes = async() => {
    const response = await fetch(`${config.apiUrl}/posts/${props.post._id}/likes`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 200) {
      props.onLikesChange(await response.json());
      // setPost(await response.json());
    }
  };
console.log(isLiked);
  return (
    <>
      <button
        onClick={() => !isLiked ? getLikes() : removeLikes()}
        className={"postLike"} type={"button"} aria-label={"Post likes icon"}>
        <span className="mr-1" aria-label={"number of likes for post"}>{props.likesAmount}</span>
        <FontAwesomeIcon aria-hidden={true} className={isLiked ? "isLiked" : ""}  icon={faHeart}/>
      </button>
    </>

  );
}
// () => post.likes.includes(user._id) ?
export default PostLike;
