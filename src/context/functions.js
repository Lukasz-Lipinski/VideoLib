import { data } from "./index";

export const getContentForSite = (key) => {
  const { content } = data;
  const { [key]: contentSite } = content;

  return contentSite;
};

export const findNumber = (str) => {
  const newString = str.slice(1, str.indexOf("."));
  return parseInt(newString[newString.length - 1]);
};

export const filtredByTag = (allMovies, expression) => {
  const filtredMovies = allMovies.filter((movie) => {
    const tags = [...movie.tags.split(",")].map((el) =>
      el.trim().toLowerCase()
    );
    if (tags.includes(expression.trim().toLowerCase())) return movie;
  });

  return filtredMovies;
};
