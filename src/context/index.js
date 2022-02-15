import React from "react";

export const data = {
  links: [
    { href: "/", label: "Netflix" },
    { href: "/signin", label: "Sign in" },
  ],
  classes: {
    nav: "nav",
    container: "container",
    signup: "signup",
    benefits: "benefits",
    FAQ: "faq",
  },
  content: {
    step2: [
      "No commitments, cancel at any time.",
      "Everything on Netflix for one low price.",
      "Unlimited viewing on all your devices.",
    ],
    number: "0123-456-78910",
    footer: {
      homepageFooter: {
        links: [
          { label: "FAQ", href: "/" },
          { label: "Investor Relations", href: "/" },
          { label: "Ways to Watch", href: "/" },
          { label: "Corporate Information", href: "/" },
          { label: "Help Center", href: "/" },
          { label: "Jobs", href: "/" },
          { label: "Terms of Use", href: "/" },
          { label: "Contact Us", href: "/" },
          { label: "Account", href: "/" },
          { label: "Redeem gift", href: "/" },
          { label: "Privacy", href: "/" },
          { label: "Speed Test", href: "/" },
          { label: "Media Centre", href: "/" },
          { label: "Buy gift cards", href: "/" },
          { label: "Cookie Preferences", href: "/" },
          { label: "Legal Notices", href: "/" },
        ],
      },
    },
    homepage: {
      header: "Unlimited films, TV programmes, cartoons, anime and more.",
      p1: "Watch anywhere where you want. Cancel at any time. ",
      p2: "Ready to watch? Enter your email to create or restart your membership",
      benefits: [
        {
          header: "Enjoy on your TV.",
          details:
            "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
          src: "/image--1.jpg",
        },
        {
          header: "Download your programmes to watch offline.",
          details:
            "Save your favourites easily and always have something to watch.",
          src: "/image--2.jpg",
        },
        {
          header: "Watch everywhere.",
          details:
            "Stream unlimited films and TV programmes on your phone, tablet, laptop and TV without paying more.",
          src: "/image--3.png",
        },
        {
          header: "Create profiles for children.",
          details:
            "Send children on adventures with their favourite characters in a space made just for them – free with your membership.",
          src: "/image--4.png",
          last: "last",
        },
      ],
      faq: [
        {
          question: "What can I watch on Netflix?",
          answear:
            "Netflix has an extensive library of feature films, documentaries, TV programmes, anime, award-winning Netflix originals and more. Watch as much as you want, anytime you want.",
        },
        {
          question: "What is Netflix?",
          answear:
            "Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!",
        },
        {
          question: "How much does Netflix cost?",
          answear:
            "Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from €7,99 to €15,99 a month. No extra costs, no contracts.",
        },
        {
          question: "Where can I watch?",
          answear:
            "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite programmes with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
        },
        {
          question: "How do I cancel?",
          answear:
            "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time.",
        },
        {
          question: "Is Netflix good for children?",
          answear:
            "The Netflix Children's experience is included in your membership to give parents control while children enjoy family-friendly TV programmes and films in their own space. Children's profiles come with PIN-protected parental controls that let you restrict the maturity rating of content children can watch and block specific titles you don’t want children to see.",
        },
      ],
    },
  },
};

export default React.createContext();
