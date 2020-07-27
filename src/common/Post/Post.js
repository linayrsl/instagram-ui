import React, {useContext, useState} from 'react';
import "./Post.scss";
import Date from "../Date/Date";
import {faComment, faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {
 faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Avatar from "../../common/Avatar/Avatar";
import PostLike from "../../PostLike/PostLike";
import {UserContext} from "../../context/userContext";
import {Link} from "react-router-dom";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import PostComments from "../../PostPage/PostComments/PostComments";
import CommentModal from "../../CommentModal/CommentModal";


function Post(props) {

  const { user } = useContext(UserContext);
  const [post, setPost] = useState(props.post);
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onLikesChange = (post) => {
    setPost(post);
  }


console.log(post);
  return (
    <div className="post" tabIndex={0}>
      <div className="postContainer d-flex flex-column">
        <div className={"postBody"}>
          <Link to={`/posts/${post._id}`}>
            <img alt={post.description} src={`${post.image}`}/>
          </Link>
        </div>
        <div className={"postFooter ml-1 mr-1"}>
          <div className={"d-flex justify-content-between"}>
            <div className={"dateAndAvatarSection align-items-baseline"}>
              <Link to={`/profile/${post.user._id}`}>
                <Avatar image={post.user && post.user.avatar} size={"sm"} className={"userAvatar"} defaultColor={"black"} />
              </Link>
              <span className={"postDate"}> <Date date={post}/></span>
            </div>
            <div className={"postControls"}>
              <div aria-label={"number of likes for post"} className={"numOfLikes"}>{post.likes.length}</div>
              <PostLike onLikesChange={onLikesChange} post={props.post} isLiked={post.likes.includes(user._id)} />
              <CommentModal postId={post._id} />
            </div>
          </div>
          {post.description ? <div className={"postDescription"}>{post.description}</div> : <FontAwesomeIcon aria-hidden={true} icon={faEllipsisH} />}
        </div>
      </div>
    </div>
  );
}

export default Post;
