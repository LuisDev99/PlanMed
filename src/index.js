import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Apollo Stuff */
import ApolloClient from 'apollo-boost';

/* Configure apollo client and pass the client object to the App component */
const client = new ApolloClient({
    uri: 'http://localhost:4000', //Todo: change this to the real backend url and enable CORS
});


ReactDOM.render(<App client={client} />, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
