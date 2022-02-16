import axios from "axios";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_API_KEY }).base(
  process.env.NEXT_PUBLIC_ENDPOINT_FOR_USERS
);

export const fetchUser = async () => {
  const baseURL = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_ENDPOINT_FOR_USERS}/users?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const data = await (await axios.get(baseURL)).data.records;
  return data;
};

export const sendUserData = ({ name, email, password, phoneNumber }) => {
  base("user").create([
    {
      fields: {
        name,
        email,
        password,
        phoneNumber,
      },
    },
  ]);
};
