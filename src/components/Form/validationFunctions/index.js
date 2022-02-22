export const validate = (values) => {
  const errors = {};

  emailValidation(values, errors);
  passwordValidation(values, errors);

  return errors;
};

export const emailValidation = (values, errors) => {
  const emailConition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!values.email) {
    errors.email = "this field can't be empty";
  } else if (!emailConition.test(values.email)) {
    errors.email = "An email is incorrected";
  }
};

export const passwordValidation = (values, errors) => {
  if (values.password) {
    if (values.password.length < 4 || values.password.length > 60) {
      errors.password = "Password must contain between 4 and 60 charackters";
    } else if (!values.password) errors.password = "A password is required";
  }
};

export const initialValues = (email) => ({
  password: "",
  email: email ? email : "",
});
