import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "./avatar-user-logo.svg";
import "./Avatar.scss";


function Avatar(props) {
  console.log(props.image);
  const size = props.size || "sm";
  const image = props.image || null;
  const className = size;
  return (
    <div className="avatar d-inline-block">
      {image ? <img src={image} className={"avatar " + className}/> : <Logo style={{fill: props.defaultColor}} />}
    </div>
  );
}

Avatar.propTypes = {
  size: PropTypes.oneOf(["md", "lg"])
};

export default Avatar;
