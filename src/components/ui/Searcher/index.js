import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { ImSearch } from "react-icons/im";

function Searcher() {
  const router = useRouter();
  const [isSearcher, setIsSearcher] = useState(false);

  const formik = useFormik({
    initialValues: { searcherInput: "" },
    validate: (values) => {
      const errors = {};

      if (!values.searcherInput) {
        errors.searcher = "No attached text";
      }

      return errors;
    },
    onSubmit: (values) => {
      const { searcherInput } = values;
      let profileName;

      if (router.query.hasOwnProperty("account")) {
        const { account } = router.query;
        profileName = account;
      }

      if (router.query.hasOwnProperty("genre")) {
        const [account] = router.query.genre;
        profileName = account;
      }

      if (router.query.hasOwnProperty("searcher")) {
        const [, account] = router.query.searcher;
        profileName = account;
      }

      router.push({
        pathname: `/dashboard/searcher/[profileName]/[searcherInput]`,
        query: { profileName, searcherInput },
      });
    },
  });

  const setSearcherHandler = () => {
    setIsSearcher((state) => !state);
  };

  const { errors, handleChange, handleSubmit } = formik;

  const placeholder = errors.searcher || "Title, geners...";

  return isSearcher ? (
    <form onSubmit={handleSubmit}>
      <label>
        <ImSearch onClick={setSearcherHandler} />
        <input
          type="search"
          name="searcherInput"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </label>
    </form>
  ) : (
    <ImSearch onClick={setSearcherHandler} />
  );
}

export default Searcher;
