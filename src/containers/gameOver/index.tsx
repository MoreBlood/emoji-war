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
import { skin, numberToEmojiString, emoticons } from '../../helpers/emojis';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
};

@(withRouter as any)
@inject('gameStore')
class GameOver extends React.Component<PropsType> {
  private gameStore: GameStore;
  private score = 0;
  private emoji = emoticons[randomInteger(0, emoticons.length)];

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.score = this.gameStore.scoreRight;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('/game');
  private menu = (): void => this.props.history.push('/');
  private settings = (): void => this.props.history.push('/settings');

  public render(): React.ReactNode {
    return (
      <div className="gameOver">
        <div className="logo">{this.emoji}</div>
        <button className="thanks">{numberToEmojiString(this.score)}</button>
        <div className="all-buttons">
          <div className="buttons">
            <button className="button play blured" onClick={this.start}>
              🔄
            </button>
          </div>
          <div className="buttons">
            <button className="button small blured" onClick={this.menu}>
              🏠
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

export default GameOver as React.ComponentType<any>;
