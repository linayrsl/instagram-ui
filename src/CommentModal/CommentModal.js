import React, {useState} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import PostComments from "../PostPage/PostComments/PostComments";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";

function CommentModal(props) {

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <button onClick={toggle} type={"button"} aria-label={"Post comment icon mr-2"}>
        <FontAwesomeIcon aria-hidden={true} className={"commentIcon"} icon={faComment} />
      </button>
      <Modal isOpen={modal} className={className} external={""}>
        <ModalHeader>
          <div className={"modalHeader d-flex justify-content-between align-items-center"}>
            <div>Add Comment</div>
            <button className="btn" onClick={toggle}>&times;</button>
          </div>
        </ModalHeader>
        <ModalBody>
          <PostComments postId={props.postId} />
        </ModalBody>
      </Modal>
      </>
  );
}

export default CommentModal;
