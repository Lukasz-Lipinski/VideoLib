import React from "react";
import { fetchUser } from "../airtable";

import { getContentForSite } from "../context/functions";

import {
  Layout,
  Navigation,
  Signup,
  Benefits,
  Container,
  Footer,
  FAQ,
} from "../components";

export async function getStaticProps() {
  const number = getContentForSite("number");
  const homepage = getContentForSite("homepage");
  const footer = getContentForSite("footer");
  const { homepageFooter } = footer;

  return {
    props: {
      homepage,
      homepageFooter,
      number,
    },
  };
}

export default function Home({ homepage, homepageFooter, number }) {
  const { header, p1, p2, benefits, faq } = homepage;

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navigation isHomePage />
      <Layout>
        <h1>{header}</h1>
        <h3>{p1}</h3>
        <h5>{p2}</h5>
        <Signup />

        <Benefits>
          {benefits.map((el, index) => (
            <Container key={`benefitsList--element--${index}`} {...el} />
          ))}
        </Benefits>
        <FAQ>
          {faq.map((el, index) => (
            <Container {...el} key={`faqList--question--${index}`} isFAQ />
          ))}
        </FAQ>

        <Footer {...homepageFooter} isHomepage number={number} />
      </Layout>
    </>
  );
}
