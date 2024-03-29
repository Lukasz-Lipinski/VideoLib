import React from "react";
import { useSelector } from "react-redux";

import {
  Footer,
  Layout,
  Navigation,
  Step1,
  Step2,
  Step3,
} from "../../../components";
import MyContext from "../../../context";

import { getContentForSite } from "../../../context/functions";

export async function getStaticProps() {
  const footer = getContentForSite("footer");
  const { links } = footer.homepageFooter;

  return {
    props: {
      links,
    },
  };
}

function RegFormPage({ links }) {
  const step = useSelector((state) => state.user.step);
  const { classes } = React.useContext(MyContext);
  const { registration } = classes;

  const nextStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 className={registration} />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className={registration}>
      <Navigation />

      <Layout>
        <div>
          <p>SETP {step} OF 3</p>
          {nextStep()}
        </div>
      </Layout>
      <Footer links={links} />
    </div>
  );
}

export default RegFormPage;
