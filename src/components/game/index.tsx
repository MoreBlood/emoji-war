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
import { randomInteger } from '../../helpers/math';

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

  private yes = (): void => this.gameStore.voteForPairs(true);
  private no = (): void => this.gameStore.voteForPairs(false);

  public render(): React.ReactNode {
    const { firstPair, secondPair, gameSize, score, comparePairs } = this.gameStore;
    return (
      <div className="App">
        <div>Score: {score}</div>
        {/* <div>{comparePairs ? '=' : '!='}</div> */}
        <div className="pairs">
          {[firstPair, secondPair].map((pair, index) => {
            return (
              <div key={`pair_${index}`} className="pair">
                {pair.map(rows => {
                  return (
                    <div className="emoji-row" style={{ order: randomInteger(0, gameSize) }} key={rows.join('-')}>
                      {rows.map(item => (
                        <div style={{ order: randomInteger(0, gameSize) }} key={item}>
                          <Emoji>{item}</Emoji>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button onClick={this.yes}>yes</button>
          <button onClick={this.no}>no</button>
        </div>
      </div>
    );
  }
}

export default Game;
