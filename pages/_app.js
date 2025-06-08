// pages/_app.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '../styles/globals.css'; // if you have global CSS like Tailwind

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // your backend GraphQL API URL
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
