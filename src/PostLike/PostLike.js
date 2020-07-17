import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import config from "../config/index";
import "./PostLike.scss";

function PostLike(props) {

  return (
    <button
      onClick={() => !props.isLiked ? props.likePost() : props.removeLikes()}
      className={"postLike"} type={"button"} aria-label={"Post likes icon"}>
      <FontAwesomeIcon aria-hidden={true} className={`heartIcon mr-2 ${props.isLiked ? "isLiked" : ""}`}  icon={faHeart}/>
    </button>

  );
}

export default PostLike;
