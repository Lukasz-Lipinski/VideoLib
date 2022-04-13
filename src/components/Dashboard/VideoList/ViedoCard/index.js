export default function VideoCard({ videos }) {
  const { url } = videos.tiny;
  return (
    <video width={320} height={240} controls>
      <source src={url} />
    </video>
  );
}
