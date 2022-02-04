import React from "react";
import Image from "next/image";

import { TiPlusOutline } from "react-icons/ti";

function Container(props) {
  const { header, details, src, question, answear, isFAQ } = props;
  const [isAnswear, setIsAnswear] = React.useState(false);

  const handleClick = () => {
    setIsAnswear((state) => !state);
  };

  return (
    <li>
      {isFAQ ? (
        <>
          <h3>{question}</h3>
          <TiPlusOutline
            className={`active--${isAnswear}`}
            data-testid="icon"
            onClick={handleClick}
          />
          {isAnswear ? <p>{answear}</p> : null}
        </>
      ) : (
        <>
          <h3>{header}</h3>
          <p>{details}</p>
        </>
      )}
    </li>
  );
}

export default Container;
