import React from "react";
import Image from "next/image";

import { TiPlusOutline } from "react-icons/ti";
import MyContext from "../../context";
import { findNumber } from "../../context/functions";

function Container(props) {
  const { header, details, question, src, answear, last, isFAQ } = props;
  const [isAnswear, setIsAnswear] = React.useState(false);

  const { classes } = React.useContext(MyContext);
  const { benefits, FAQ } = classes;

  const EvenComponent = () => (
    <div className="evenComponent">
      {last ? (
        <Image src={src} alt={header} width={300} height={300} />
      ) : (
        <Image src={src} alt={header} width={500} height={300} />
      )}
      <div className={`${benefits}--text`}>
        <h3>{header}</h3>
        <p>{details}</p>
      </div>
    </div>
  );

  const OddComponent = () => (
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
  );

  const FAQList = () => (
    <>
      <div className={`${FAQ}--element`}>
        <h3>{question}</h3>
        <TiPlusOutline
          className={`active--${isAnswear}`}
          data-testid="icon"
          onClick={handleClick}
        />
      </div>
      {isAnswear ? <p className={`${FAQ}--answear`}>{answear}</p> : null}
    </>
  );

  const handleClick = () => {
    setIsAnswear((state) => !state);
  };

  return (
    <li>
      {isFAQ ? (
        <FAQList />
      ) : findNumber(src) % 2 ? (
        <OddComponent />
      ) : (
        <EvenComponent />
      )}
    </li>
  );
}

export default Container;
