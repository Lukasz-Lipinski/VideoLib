import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Optinos } from "../";
import { resetStep } from "../Form/redux";

const DUMMY_DATA = [
  {
    title: "Basic",
    description: {
      price: 15,
      opportunities:
        "It's a basic option, that enabes you for watching newly-uploaded movies in HD quality. You can create 2 profiles per account",
    },
  },
  {
    title: "Premium HD",
    description: {
      price: 24,
      opportunities:
        "It's a premium option, that enabes you for watching ultra HD quality movies. You can create 3 profiles per account",
    },
  },
  {
    title: "Ultra HD",
    description: {
      price: 35,
      opportunities:
        "It's a ultra premium option, that enabes you for watching movies using the highest quality. You can create 2 profiles per account",
    },
  },
];

const Step3 = () => {
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
      <Optinos availableOptions={DUMMY_DATA} />
    </>
  );
};

export default Step3;
