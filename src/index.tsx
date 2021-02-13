/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Game from './containers/game';
import { GameStore } from './stores/gameStore';
import Menu from './containers/menu';
import Settings from './containers/settings';
import About from './containers/about';
import GameOver from './containers/gameOver';
import Store from './containers/store';
import Download from './containers/download';
import { CSSTransition } from 'react-transition-group';
import { SettingsStore } from './stores/settingsStore';
import { ShopStore } from './stores/shopStore';
import Privacy from './containers/privacy';
import Help from './containers/help';
import Tutorial from './containers/tutorial';

const shopStore = new ShopStore();
const settingsStore = new SettingsStore(shopStore);
const gameStore = new GameStore(settingsStore, shopStore);

const stores = {
  settingsStore,
  gameStore,
  shopStore,
};

const routes = [
  { path: '/about', Component: About },
  { path: '/', Component: Menu },
  { path: '/game', Component: Game },
  { path: '/settings', Component: Settings },
  { path: '/gameOver', Component: GameOver },
  { path: '/store', Component: Store },
  { path: '/download', Component: Download },
  { path: '/privacy', Component: Privacy },
  { path: '/help', Component: Help },
  { path: '/tutorial', Component: Tutorial },
];

const router = (
  <Provider {...stores}>
    <HashRouter>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }: { match: string[] }) => (
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
