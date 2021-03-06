import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { SettingsStore } from '../../stores/settingsStore';
import { ShopStore } from '../../stores/shopStore';
import List from '../../components/list';
import { ListItemInterface } from '../../types/listItem';
import { vibrate, VibrationType } from '../../helpers/vibrate';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
  settingsStore?: SettingsStore;
  shopStore?: ShopStore;
};

@withRouter
@inject('gameStore', 'settingsStore', 'shopStore')
@observer
class Store extends React.Component<PropsType> {
  private gameStore: GameStore;
  private settingsStore: SettingsStore;
  private shopStore: ShopStore;

  public constructor(props?: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.settingsStore = this.props.settingsStore;
    this.shopStore = this.props.shopStore;
  }

  public componentWillMount(): void {
    window.ga?.trackView('Store');
  }

  public componentWillUnmount(): void {}

  private menu = (): void => {
    vibrate(VibrationType.tap);
    this.props.history.push('/');
  };

  public render(): React.ReactNode {
    const { storeItems, money } = this.shopStore;
    return (
      <div className="store">
        <div className="logo">🛒</div>
        <div className="money-holder">
          <div className="blured highscore">{money} 💵</div>
        </div>
        <p>Game modes can be enabled in ⚙️ page</p>
        <List
          listItems={Array.from(storeItems.values())
            .filter(e => !e.hidden)
            .map((e: ListItemInterface) => {
              e.onClick = (): void => vibrate(VibrationType.tap) && this.shopStore.buyItem(e.id);
              return e;
            })}
        />
        <div className="buttons">
          <button className="button back blured" onClick={this.menu}>
            ⏪
          </button>
        </div>
      </div>
    );
  }
}

export default Store;
