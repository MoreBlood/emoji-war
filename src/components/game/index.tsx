import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import Emoji from '../emoji';
import { randomInteger } from '../../helpers/math';
import { skin } from '../../helpers/emojis';

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
    const { firstPair, secondPair, gameSize, scoreRight, scoreWrong, comparePairs } = this.gameStore;
    return (
      <div className="App">
        <div className="gameField">
          {/* <div className="blured score debug">
            {firstPair.hash}
            {comparePairs ? ' = ' : ' != '}
            {secondPair.hash}
          </div> */}
          <div style={{ display: 'flex' }}>
            <div className="blured score">{`✅: ${scoreRight}`}</div>
            <div className="blured score">{`❌: ${scoreWrong}`}</div>
          </div>
          <div className="pairs blured">
            {[firstPair, secondPair].map((pair, index) => {
              return (
                <div className="pair" key={`pair_${pair.hash}_${index}`}>
                  {pair.pair.map(rows => {
                    return (
                      <div className="emoji-row" key={rows.join('-')}>
                        {rows.map(item => (
                          <div key={item}>
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
          <div className="blured buttons">
            <button className="thumb down" onClick={this.yes}>
              <Emoji>{`👍${skin[randomInteger(0, skin.length)]}`}</Emoji>
            </button>
            <button className="thumb up" onClick={this.no}>
              <Emoji>{`👎${skin[randomInteger(0, skin.length)]}`}</Emoji>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
