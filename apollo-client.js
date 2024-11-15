import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";

const uploadLink = createUploadLink({
    uri: "http://localhost:8000/graphql/",
});

const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
});

export default client;
