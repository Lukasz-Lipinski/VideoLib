import { Form, Layout, Navigation } from "../../../components";

function RegForm() {
  return (
    <>
      <Navigation />
      <p>SETP x of 3</p>
      <h2>Create a password to start your membership</h2>
      <Layout>
        <Form formType="Sign up" />
      </Layout>
    </>
  );
}

export default RegForm;
