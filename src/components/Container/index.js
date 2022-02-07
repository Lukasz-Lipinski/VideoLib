import React from "react";
import Image from "next/image";

import { TiPlusOutline } from "react-icons/ti";
import MyContext from "../../context";

function Container(props) {
  const { header, details, question, src, answear, last, isFAQ } = props;
  const [isAnswear, setIsAnswear] = React.useState(false);

  const { classes } = React.useContext(MyContext);
  const { benefits } = classes;

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
          <div className={`${benefits}--text`}>
            <h3>{header}</h3>
            <p>{details}</p>
          </div>
          {last ? (
            <Image src={src} alt={header} width={300} height={300} />
          ) : (
            <Image src={src} alt={header} width={500} height={300} />
          )}
        </>
      )}
    </li>
  );
}

export default Container;
