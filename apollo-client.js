// apollo-client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql/",  // Add trailing slash here
    cache: new InMemoryCache(),
});

export default client;