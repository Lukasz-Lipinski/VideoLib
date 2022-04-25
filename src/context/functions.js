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
  const formattedExpression = expression.trim().toLowerCase();

  const filteredMovies = allMovies.filter((movie) => {
    const { tags } = movie;

    if (tags.includes(formattedExpression)) return movie;
  });

  return filteredMovies;
};
