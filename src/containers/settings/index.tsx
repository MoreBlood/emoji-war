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

@(withRouter as any)
@inject('gameStore')
@observer
class Settings extends React.Component<PropsType> {
  private gameStore: GameStore;

  public constructor(props?: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private switchGameType = (): void => this.gameStore.switchGameMode();
  private switchLGBTFriendly = (): void => this.gameStore.switchLGBTFriendly();
  private switchSwipesDisabled = (): void => this.gameStore.switchSwipesDisabled();
  private menu = (): void => this.props.history.goBack();

  public render(): React.ReactNode {
    const { gameSizeEmoji, LGBTFriendly, swipesDisabled } = this.gameStore;
    return (
      <div className="settings">
        <div className="logo">⚙️</div>
        <div className="all-buttons">
          <button className="button small blured" onClick={this.switchGameType}>
            {gameSizeEmoji} <span className="setting-item-text">Game size</span>
          </button>
          <button className="button small blured" onClick={this.switchSwipesDisabled}>
            👆{' '}
            <span style={{ textDecoration: swipesDisabled ? 'line-through' : 'none' }} className="setting-item-text">
              Swipes
            </span>
          </button>
          <button className="button small blured" onClick={this.switchLGBTFriendly}>
            🏳️‍🌈{' '}
            <span style={{ textDecoration: !LGBTFriendly ? 'line-through' : 'none' }} className="setting-item-text">
              LGBT Friendly
            </span>
          </button>
          <div className="buttons">
            <button className="button back blured" onClick={this.menu}>
              ⏪
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
