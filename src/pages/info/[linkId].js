export default function InfoPage({ linkId }) {
  return (
    <h1>
      Info Page
      <p>{linkId}</p>
    </h1>
  );
}

export async function getStaticProps(context) {
  const { linkId } = context.params;

  return {
    props: {
      linkId,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { linkId: "faq" } }],
    fallback: true,
  };
}
