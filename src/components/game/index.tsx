import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import Emoji from '../emoji';

interface KeyboardEvent {
  keyCode: number;
}

type PropsType = RouteComponentProps<null> & {
  gameStore: GameStore;
};

@(withRouter as any)
@inject('gameStore')
@observer
class Game extends React.Component<PropsType> {
  private gameStore: GameStore;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  public render(): React.ReactNode {
    return (
      <div className="App">
        <Emoji>👩‍❤️‍💋‍👩</Emoji>
      </div>
    );
  }
}

export default Game;
