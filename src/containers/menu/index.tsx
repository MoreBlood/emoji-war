import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { vibrate, VibrationType } from '../../helpers/vibrate';
import { ShopStore } from '../../stores/shopStore';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
  shopStore?: ShopStore;
};

@withRouter
@inject('gameStore', 'shopStore')
@observer
class Menu extends React.Component<PropsType> {
  private gameStore: GameStore;
  private shopStore: ShopStore;
  private emoji = this.props.gameStore.randomSadOrHappyEmoticon;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.shopStore = this.props.shopStore;
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

  public render(): React.ReactNode {
    const { money } = this.shopStore;

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
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default Menu as React.ComponentType<any>;
