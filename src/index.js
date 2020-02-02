import React from 'react';
import ReactDOM from 'react-dom';

import { ProvideMovie } from './hooks/useMovie';
import { App } from './components/App';

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <ProvideMovie>
    <App />
  </ProvideMovie>,
  rootElement
)
