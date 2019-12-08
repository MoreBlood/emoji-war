import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import play from './images/play-emoji.png';
import logo from './images/logo.png';

import { GameStore } from '../../stores/gameStore';
import Emoji from '../../components/emoji';
import { randomInteger } from '../../helpers/math';
import { skin } from '../../helpers/emojis';

type PropsType = RouteComponentProps<null>;

@(withRouter as any)
@observer
class Menu extends React.Component<PropsType> {
  private gameStore: GameStore;

  public constructor(props?: PropsType) {
    super(props);
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');

  public render(): React.ReactNode {
    return (
      <div className="menu">
        <img className="logo" src={logo}></img>
        <div className="all-buttons">
          <div className="buttons">
            <button className="button play blured" onClick={this.start}>
              <img src={play}></img>
            </button>
          </div>
          <div className="buttons">
            <button className="button small blured" onClick={this.start}>
              🤔
            </button>
            <button className="button small blured" onClick={this.start}>
              ⚙️
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
