import React, {useContext} from 'react';
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
        "Authorization": "Bearer " + user.token,
      },
      credentials: "include",
    });
    if (response.status === 409) {
      // TODO: show error message
    }
    if (response.status === 200) {
      props.onLikesChange(true);
    }
  }

  const removeLikes = async() => {
    const response = await fetch(`${config.apiUrl}/posts/${props.post._id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Authorization": "Bearer " + user.token}
    });
    if (response.status === 200) {
      props.onLikesChange(false);
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
export default PostLike;
