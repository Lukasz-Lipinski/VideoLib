import Tags from "./Tags";
import VideoCard from "./ViedoCard";

function VideoList({ movies, title, end }) {
  return (
    <>
      <h3>{title}</h3>
      <ul className="dashboard-container-viedoList">
        {movies.map((movie, index) => {
          if (index < end) {
            return (
              <li key={`video-list-${movie.user_id}`}>
                <VideoCard {...movie} />
                <Tags tags={movie.tags} id={`${movie.id}-${movie.user_id}`} />
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default VideoList;
