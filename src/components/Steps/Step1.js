import { Form } from "..";

function Step1({ handleClick }) {
  return (
    <>
      <h2>Welcome back!</h2>
      <h2>Joining Netflix is easy.</h2>
      <Form typeofForm="SignupForm" />
    </>
  );
}

export default Step1;
