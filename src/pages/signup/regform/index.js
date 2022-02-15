import React from "react";
import { Footer, Layout, Navigation, Step1, Step2 } from "../../../components";
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

function RegForm({ links }) {
  const [pageNumber, setPageNumber] = React.useState(1);

  const nextPage = () => {
    setPageNumber((state) => state + 1);
  };

  const nextStep = () => {
    switch (pageNumber) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="registration">
      <Navigation />

      <Layout>
        <div>
          <p>SETP {pageNumber} of 3</p>
          {nextStep()}
          <button onClick={nextPage}>Next</button>
        </div>
      </Layout>
      <Footer links={links} />
    </div>
  );
}

export default RegForm;
