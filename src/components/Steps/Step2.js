import React from "react";
import MyContext from "../../context";

function Step2() {
  const context = React.useContext(MyContext);

  const { content } = context;
  const { step2 } = content;

  return (
    <>
      <h2>Choose your plan.</h2>
      <ul className="step2--list">
        {step2.map((content, index) => (
          <li key={`step2-list__${index}`}>{content}</li>
        ))}
      </ul>
    </>
  );
}

export default Step2;
