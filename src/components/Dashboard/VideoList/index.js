import { useEffect, useState, useMemo } from "react";
import VideoCard from "./ViedoCard";

function VideoList({ movies, title, start = 0, end, inline }) {
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    if (selectedMovies) {
      const newMovies = movies.slice(start, end);
      setSelectedMovies(newMovies);
    }
  }, [movies]);

  const listInline = useMemo(() => {
    const setupClass = inline ? "list-inline" : "dashboard-container-viedoList";
    return setupClass;
  }, [inline]);

  return (
    <>
      <h3>{title}</h3>
      <ul className={`${listInline}`}>
        {selectedMovies.map((movie, index) => {
          if (index < end) {
            return (
              <li key={`video-list-${movie.user_id}-${index}-title`}>
                <VideoCard size="tiny" movie={movie} />
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default VideoList;
