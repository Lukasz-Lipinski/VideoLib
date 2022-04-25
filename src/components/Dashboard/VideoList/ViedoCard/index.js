import Tags from "../Tags";

export default function VideoCard({ size, movie, width = 320, height = 240 }) {
  const {
    videos: { [size]: videoSize },
  } = movie;

  if (size !== "tiny") {
    const { url, width, height } = videoSize;

    return (
      <>
        <video width={width} height={height} controls>
          <source src={url} />
        </video>
      </>
    );
  }
  const { url } = videoSize;

  return (
    <>
      <video width={width} height={height} controls>
        <source src={url} />
      </video>
      <Tags tags={movie.tags} />
    </>
  );
}
