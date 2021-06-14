import { ApolloClient, InMemoryCache, HttpLink, from, } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

/** back end addresses **/
const url = (window.location.hostname === 'localhost') ? 'http://localhost:1337/graphql' : 'https://backend.mayofy.com/graphql';

/** error message when contenting with graphql **/
const errorLink = onError(({ operation,  graphQLErrors,  }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Operation ${operation} Message: ${message}, 
                  Location: ${locations}, Path: ${path}`,
            );
            return message;
        });
    }
});
  
/** back end connection link is created **/
const link = from([
    errorLink,
    new HttpLink({ uri: url }),
]);
  

/** the connection with the back end is created **/
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export default client;
