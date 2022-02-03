import React from "react";

export const data = {
  links: [
    { href: "/", label: "Netflix" },
    { href: "signin", label: "Sign in" },
  ],
  classes: {
    nav: "nav",
    container: "container",
    signup: "signup",
    benefits: "benefits",
    FAQ: "faq",
  },
  content: {
    homepage: {
      header: "Unlimited films, TV programmes, cartoons, anime and more.",
      p1: "Watch anywhere where you want. Cancel at any time. ",
      p2: "Ready to watch? Enter your email to create or restart your membership",
      benefits: [
        {
          header: "Enjoy on your TV.",
          details:
            "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
          src: "",
        },
        {
          header: "Download your programmes to watch offline.",
          details:
            "Save your favourites easily and always have something to watch.",
          src: "",
        },
        {
          header: "Watch everywhere.",
          details:
            "Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.        ",
          src: "",
        },
        {
          header: "Create profiles for children.",
          details:
            "Send children on adventures with their favourite characters in a space made just for them – free with your membership.",
          src: "",
        },
      ],
      faq: [
        { question: "", answear: "" },
        { question: "", answear: "" },
        { question: "", answear: "" },
        { question: "", answear: "" },
      ],
    },
  },
};

export default React.createContext();
