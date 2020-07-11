import React from "react";
import "./AppLoader.scss";

function AppLoader() {
  return (
    <div className="appLoader">
      {/* Class was defined in index.html */}
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default AppLoader;
