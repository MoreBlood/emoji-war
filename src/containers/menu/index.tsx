import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
};

@withRouter
@inject('gameStore')
@observer
class Menu extends React.Component<PropsType> {
  private gameStore: GameStore;
  private emoji = this.props.gameStore.randomSadOrHappyEmoticon;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private settings = (): void => this.props.history.push('settings');
  private about = (): void => this.props.history.push('about');
  private store = (): void => this.props.history.push('store');

  public render(): React.ReactNode {
    return (
      <div className="menu">
        <div className="logo">{this.emoji}</div>
        <div className="all-buttons">
          <div className="buttons">
            <button className="button play blured" onClick={this.start}>
              ▶️
            </button>
          </div>
          <div className="buttons">
            <button className="button small blured" onClick={this.about}>
              🤔
            </button>
            <button className="button small blured" onClick={this.store}>
              🛒
            </button>
            <button className="button small blured" onClick={this.settings}>
              ⚙️
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default Menu as React.ComponentType<any>;
