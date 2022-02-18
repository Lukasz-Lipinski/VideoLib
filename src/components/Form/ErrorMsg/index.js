import React from "react";

function ErrorMsg({ msg, component }) {
  return msg
    ? React.createElement(component, { className: "errorMsg" }, msg)
    : null;
}

export default ErrorMsg;
