import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { vibrate, VibrationType } from '../../helpers/vibrate';
import { ShopStore } from '../../stores/shopStore';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs } from '../../helpers/platform';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
  settingsStore?: SettingsStore;
  shopStore?: ShopStore;
};

@withRouter
@inject('gameStore', 'shopStore', 'settingsStore')
@observer
class Menu extends React.Component<PropsType> {
  private gameStore: GameStore;
  private shopStore: ShopStore;
  private settingsStore: SettingsStore;
  private emoji = this.props.gameStore.randomSadOrHappyEmoticon;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.shopStore = this.props.shopStore;
    this.settingsStore = this.props.settingsStore;

    if (this.settingsStore.firstTime) {
      this.props.history.push('tutorial');
    }
  }

  public componentWillMount(): void {
    try {
      // window.admob?.banner.show();
    } catch (err) {
      console.log(err);
    }
  }

  public componentWillUnmount(): void {
    window.admob?.banner.hide();
  }

  private start = (): void => vibrate(VibrationType.tap) && this.props.history.push('game');
  private settings = (): void => vibrate(VibrationType.tap) && this.props.history.push('settings');
  private about = (): void => vibrate(VibrationType.tap) && this.props.history.push('about');
  private store = (): void => vibrate(VibrationType.tap) && this.props.history.push('store');
  private leaderboard = (): void => {
    vibrate(VibrationType.tap);
    var data = {
      leaderboardId: 'top_scores',
    };
    window.gamecenter?.showLeaderboard(
      board => console.log(board),
      err => console.log(err),
      data,
    );
  };

  public render(): React.ReactNode {
    const { money } = this.shopStore;
    const { platform } = this.settingsStore;

    if (this.settingsStore.firstTime) {
      return null;
    }

    return (
      <div className="menu">
        <div className="logo">{this.emoji}</div>
        <div className="money-holder">
          <div className="blured highscore">{money} 💵</div>
        </div>
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
            {isIOs() ? (
              <button className="button small blured" onClick={this.leaderboard}>
                🥇
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default Menu as React.ComponentType<any>;
