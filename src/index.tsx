import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from './components/game';
import { store as gameStore } from './stores/gameStore';

const stores = {
  gameStore,
};

const router = (
  <Provider {...stores}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Game} />
      </Switch>
    </HashRouter>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// function listener(): void {
//   switch (screen.orientation.type) {
//     case 'landscape-primary':
//       window.document.documentElement.requestFullscreen();
//       break;
//     default: {
//       if (window.document.fullscreen) {
//         window.document.exitFullscreen();
//       }
//     }
//   }
// }

// if (window.screen && window.screen.orientation) {
//   window.screen.orientation.addEventListener('change', listener, false);
// }
