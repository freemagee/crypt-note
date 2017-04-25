import React from 'react';
import ReactDOM from 'react-dom';

import NotesContainer from './containers/NotesContainer.jsx';

const appContainer = document.getElementById('app');

const renderApp = () => {
  ReactDOM.render(
    <NotesContainer />,
    appContainer
  );
};

renderApp();
