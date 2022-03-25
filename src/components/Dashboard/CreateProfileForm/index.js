import { useFormik } from "formik";

function CreateProfileForm() {
  const { errors, handleSubmit, values, handleChange } = useFormik({
    initialValues: { profileName: "", forKids: false },
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
      const { profileName, forKids } = values;
    },
  });

  return (
    <div className="createProfile">
      <form className="createProfile-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profileName">Profile name:</label>
          <input
            id="profileName"
            type="text"
            values={values.profileName}
            onChange={handleChange}
          />
        </div>
        {errors.isError ? (
          <div className="createProfile-form-error">{errors.msg}</div>
        ) : null}
        <div>
          <label htmlFor="forKids">For kids</label>
          <input
            type="checkbox"
            id="forKids"
            value={values.forKids}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProfileForm;
