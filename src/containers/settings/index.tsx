import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { SettingsStore } from '../../stores/settingsStore';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
  settingsStore?: SettingsStore;
};

@withRouter
@inject('gameStore', 'settingsStore')
@observer
class Settings extends React.Component<PropsType> {
  private gameStore: GameStore;
  private settingsStore: SettingsStore;

  public constructor(props?: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.settingsStore = this.props.settingsStore;
  }

  public componentWillMount(): void {
    window.ga?.trackView('Settings');
  }

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private switchGameType = (): void => this.settingsStore.switchGameSize();
  private switchGameMode = (): void => {
    window.ga?.trackEvent('Settings', 'Change Game Mode');
    this.settingsStore.switchGameMode();
  };
  private switchLGBTFriendly = (): void => this.settingsStore.switchLGBTFriendly();
  private switchSwipesDisabled = (): void => this.settingsStore.switchSwipesDisabled();
  private reset = (): void => this.settingsStore.reset();
  private menu = (): void => this.props.history.push('/');

  public render(): React.ReactNode {
    const { /* gameSizeEmoji, */ swipesDisabled, gameModeItem } = this.settingsStore;
    return (
      <div className="settings">
        <div className="logo">⚙️</div>
        <div className="all-buttons">
          <button className="button small blured" onClick={this.switchGameMode}>
            {gameModeItem.icon} <span className="setting-item-text">{gameModeItem.name}</span>
          </button>
          {/*<button className="button small blured" onClick={this.switchGameType}>
            {gameSizeEmoji} <span className="setting-item-text">Game size</span>
          </button> */}
          <button className="button small blured" onClick={this.switchSwipesDisabled}>
            👆{' '}
            <span
              style={{ textDecoration: swipesDisabled ? 'line-through' : 'none' }}
              className="setting-item-text"
            >
              Swipes
            </span>
          </button>
          <button className="button small blured" onClick={this.reset}>
            🆕 <span className="setting-item-text">Reset</span>
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
