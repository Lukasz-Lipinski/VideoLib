import { useRouter } from "next/router";

import { InfoNavigation } from "../../components";
import infoPageData from "../../data/infoPageData";

export default function InfoPage({ pageContent }) {
  const router = useRouter();

  if (!pageContent) {
    return <p>Loading...</p>;
  }

  const { title, content } = pageContent;

  const handleClickRouter = (path) => {
    router.push(path);
  };

  return (
    <>
      <InfoNavigation handleClickRouter={handleClickRouter} />
      <h2>{title}</h2>
      <section className="content">{content}</section>
    </>
  );
}

export async function getStaticProps(context) {
  const { linkId } = context.params;

  const { [linkId]: pageContent } = infoPageData;

  if (!pageContent) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      pageContent,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { linkId: "faq" } }],
    fallback: true,
  };
}
