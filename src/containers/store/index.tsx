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
    // this.shopStore.initStore();
  }

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private switchGameType = (): void => this.settingsStore.switchGameSize();
  private switchLGBTFriendly = (): void => this.settingsStore.switchLGBTFriendly();
  private switchSwipesDisabled = (): void => this.settingsStore.switchSwipesDisabled();
  private menu = (): void => this.props.history.goBack();

  public render(): React.ReactNode {
    const { storeItems, money } = this.shopStore;
    return (
      <div className="store">
        <div className="logo">🛒</div>
        <div className="money-holder">
          <div className="blured highscore">{money} 💵</div>
        </div>
        <List
          listItems={Array.from(storeItems.values())
            .filter(e => !e.hidden)
            .map((e: ListItemInterface) => {
              e.onClick = (): void => this.shopStore.buyItem(e.id);
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
