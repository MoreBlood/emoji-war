/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from './containers/game';
import { store as gameStore } from './stores/gameStore';
import Menu from './containers/menu';
import { CSSTransition } from 'react-transition-group';

const stores = {
  gameStore,
};

const routes = [{ path: '/game', Component: Game }, { path: '/', Component: Menu }];

const router = (
  <Provider {...stores}>
    <HashRouter>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }: { match: any }) => (
            <CSSTransition in={match != null} timeout={300} classNames="page" unmountOnExit>
              <div className="page">
                <Component />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
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
