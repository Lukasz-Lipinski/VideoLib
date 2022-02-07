import React from "react";
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
