import { data } from "./index";

export const getContentForSite = (key) => {
  const { content } = data;
  const { [key]: contentSite } = content;

  return contentSite;
};
