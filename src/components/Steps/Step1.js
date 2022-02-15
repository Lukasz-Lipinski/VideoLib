import { NavLink, Form } from "..";

function Step1() {
  return (
    <>
      <h2>Welcome back!</h2>
      <h2>Joining Netflix is easy.</h2>
      <Form formType="Sign up" className="registration" />
      <NavLink label="Forgot your password?" href="/" />
    </>
  );
}

export default Step1;
