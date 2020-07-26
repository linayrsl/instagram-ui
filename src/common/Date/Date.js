import React from 'react';
import moment from 'moment';

import "./Date.scss";

function Date(props) {
  return (
    <span className="date">
      {moment(props.date.createdAt).fromNow()}
    </span>
  );
}

export default Date;
