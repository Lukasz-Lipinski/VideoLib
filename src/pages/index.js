import React from "react";

import { Layout, Navigation, Signup, Benefits, Container } from "../components";
import { getContentForSite } from "../context/functions";

export async function getStaticProps() {
  const content = getContentForSite("homepage");

  return {
    props: {
      content,
    },
  };
}

export default function Home({ content }) {
  const { header, p1, p2, benefits } = content;
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
      </Layout>
    </>
  );
}
