import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache } from "@apollo/client";
import { StateProvider } from "./store";

import "./index.css";
import App from "./App";

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3001/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StateProvider>
        <App />
      </StateProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
