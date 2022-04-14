export default function VideoCard({ size, videos, width = 320, height = 240 }) {
  const { [size]: videoSize } = videos;

  if (size !== "tiny") {
    const { url, width, height } = videoSize;

    return (
      <video width={width} height={height} controls>
        <source src={url} />
      </video>
    );
  }
  return (
    <video width={width} height={height} controls>
      <source src={url} />
    </video>
  );
}
