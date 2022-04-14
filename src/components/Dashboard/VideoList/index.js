import { useEffect, useState } from "react";
import Tags from "./Tags";
import VideoCard from "./ViedoCard";

function VideoList({ movies, title, start, end }) {
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    if (selectedMovies) {
      const newMovies = movies.slice(start, end);

      setSelectedMovies(newMovies);
    }
  }, [movies, selectedMovies, start, end]);

  return (
    <>
      <h3>{title}</h3>
      <ul className="dashboard-container-viedoList">
        {selectedMovies.map((movie, index) => {
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
