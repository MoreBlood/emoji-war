import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import Emoji from '../../components/emoji';
import { randomInteger } from '../../helpers/math';
import { skin, emoticons } from '../../helpers/emojis';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
};

@(withRouter as any)
@inject('gameStore')
@observer
class Menu extends React.Component<PropsType> {
  private gameStore: GameStore;
  private emoji = emoticons[randomInteger(0, emoticons.length)];

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private settings = (): void => this.props.history.push('settings');
  private about = (): void => this.props.history.push('about');

  public render(): React.ReactNode {
    const { LGBTFriendly } = this.gameStore;
    return (
      <div className="menu">
        <div className="logo">{LGBTFriendly ? this.emoji : '😔'}</div>
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
            <button className="button small blured" onClick={this.settings}>
              ⚙️
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu as React.ComponentType<any>;
