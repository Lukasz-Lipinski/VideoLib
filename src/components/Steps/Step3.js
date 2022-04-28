import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import { Optinos } from "../";
import { resetStep } from "../Form/redux";
import MyContext from "../../context/index";

const Step3 = () => {
  const { abonament } = useContext(MyContext);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetStep());
    };
  }, [dispatch]);

  return (
    <>
      <h2>Step 3</h2>
      <div>it is another step, some information will be available soon</div>
      <Optinos availableOptions={abonament} />
    </>
  );
};

export default Step3;
