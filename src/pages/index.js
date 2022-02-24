import React from "react";
import { fetchUser } from "../airtable";
import { setUsers } from "../components/Form/redux";

import { getContentForSite } from "../context/functions";

import {
  Layout,
  Navigation,
  Form,
  Benefits,
  Container,
  Footer,
  FAQ,
} from "../components";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  const fetchData = React.useCallback(async () => {
    const result = await fetchUser();

    dispatch(setUsers(result));
  }, [dispatch]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
