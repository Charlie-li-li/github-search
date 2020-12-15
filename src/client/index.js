import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL, TOKEN } from "../constantes";

const client = new ApolloClient({
  uri: URL,
  headers: {
    authorization: `bearer ${TOKEN}`,
  },
});

export default client;
