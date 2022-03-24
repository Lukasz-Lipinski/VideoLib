import { useFormik } from "formik";

function CreateProfileForm() {
  const { errors, handleSubmit, values, handleChange } = useFormik({
    initialValues: { profileName: "" },
    initialErrors: { isError: false, msg: "" },
    validate: (values) => {
      const { profileName } = values;

      if (!profileName) {
        return {
          isError: true,
          msg: "Profile name is empty!",
        };
      }
      return {};
    },
    onSubmit: function (values) {
      console.log(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profileName">Profile name:</label>
        <input
          id="profileName"
          type="text"
          values={values.profileName}
          onChange={handleChange}
        />
      </div>
      {errors.isError ? <div>{errors.msg}</div> : null}
      <div>
        <label htmlFor="forKids">For kids</label>
        <input type="checkbox" id="forKids" />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateProfileForm;
