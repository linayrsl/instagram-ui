import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "./avatar-user-logo.svg";
import "./Avatar.scss";


function Avatar(props) {
  const size = props.size || "sm";
  const image = props.image || null;
  return (
    <div className="avatar d-inline-block">
      {image ? <img alt={"User avatar"} src={image} className={"avatar " + size}/> : <Logo style={{fill: props.defaultColor}} />}
    </div>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

export default Avatar;
