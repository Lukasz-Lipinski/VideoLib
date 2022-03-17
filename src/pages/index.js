import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Layout,
  Navigation,
  Form,
  Benefits,
  Container,
  Footer,
  FAQ,
  Snackbar,
} from "../components";

import { getContentForSite } from "../context/functions";

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

  return (
    <>
      <Navigation isHomePage />
      <Layout>
        <h1>{header}</h1>
        <h3>{p1}</h3>
        <h5>{p2}</h5>
        <Form typeofForm="MainSiteForm" />

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
