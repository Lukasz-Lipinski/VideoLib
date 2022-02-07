import React from "react";
import Image from "next/image";

import { TiPlusOutline } from "react-icons/ti";
import MyContext from "../../context";
import { findNumber } from "../../context/functions";

const useScreen = () => {
  const [width, setWidth] = React.useState(0);

  const resize = () => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  };

  return [width, resize];
};

function Container(props) {
  const { header, details, question, src, answear, last, isFAQ } = props;
  const [isAnswear, setIsAnswear] = React.useState(false);

  const { classes } = React.useContext(MyContext);
  const { benefits } = classes;

  const [deviceWidth, resize] = useScreen();

  const EvenComponent = () => {
    return (
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
  };

  const OddComponent = () => {
    if (deviceWidth > 948) {
      return (
        <>
          {last ? (
            <Image src={src} alt={header} width={300} height={300} />
          ) : (
            <Image src={src} alt={header} width={500} height={300} />
          )}
          <div className={`${benefits}--text`}>
            <h3>{header}</h3>
            <p>{details}</p>
          </div>
        </>
      );
    }
    return <EvenComponent />;
  };

  const FAQList = () => (
    <>
      <h3>{question}</h3>
      <TiPlusOutline
        className={`active--${isAnswear}`}
        data-testid="icon"
        onClick={handleClick}
      />
      {isAnswear ? <p>{answear}</p> : null}
    </>
  );

  const handleClick = () => {
    setIsAnswear((state) => !state);
  };

  React.useEffect(() => {
    resize();
  }, [resize]);

  return (
    <li>
      {isFAQ ? (
        <FAQList />
      ) : findNumber(src) % 2 ? (
        <EvenComponent />
      ) : (
        <OddComponent />
      )}
    </li>
  );
}

export default Container;
