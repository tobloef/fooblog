import ApolloClient from "apollo-boost";
import { store } from "../redux/store.js";

export const graphql = new ApolloClient({
    uri: "http://localhost:4000",
    request: (operation) => {
        const authToken = store.getState().persist.authToken;
        operation.setContext({
            headers: {
                authorization: authToken ? `Bearer ${authToken}` : ""
            }
        })
    }
});
