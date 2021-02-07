import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { SettingsStore } from '../../stores/settingsStore';
import { vibrate, VibrationType } from '../../helpers/vibrate';

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

  private switchGameType = (): void => this.settingsStore.switchGameSize();
  private switchGameMode = (): void => {
    vibrate(VibrationType.tap);
    window.ga?.trackEvent('Settings', 'Change Game Mode');
    this.settingsStore.switchGameMode();
  };
  private switchLGBTFriendly = (): void => this.settingsStore.switchLGBTFriendly();
  private switchSwipesDisabled = (): void =>
    vibrate(VibrationType.tap) && this.settingsStore.switchSwipesDisabled();
  private reset = (): void => vibrate(VibrationType.tap) && this.settingsStore.reset();
  private menu = (): void => vibrate(VibrationType.tap) && this.props.history.push('/');

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
