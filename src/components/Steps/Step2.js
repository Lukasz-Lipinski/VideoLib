import React from "react";
import { useDispatch } from "react-redux";
import MyContext from "../../context";
import { increamentStep } from "../Form/redux";

function Step2() {
  const { content } = React.useContext(MyContext);
  const { step2 } = content;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(increamentStep());
  };

  return (
    <>
      <h2>Choose your plan.</h2>
      <ul className="step2--list">
        {step2.map((content, index) => (
          <li key={`step2-list__${index}`}>{content}</li>
        ))}
      </ul>

      <button type="button" onClick={handleClick}>
        Next
      </button>
    </>
  );
}

export default Step2;
