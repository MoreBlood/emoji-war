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
    const { firstPair, secondPair, timer, scoreRight, scoreWrong, comparePairs, skinColor } = this.gameStore;
    return (
      <div className="App">
        <div className="gameField">
          {/* <div className="blured score debug">
            {firstPair.hash}
            {comparePairs ? ' = ' : ' != '}
            {secondPair.hash}
          </div> */}
          <div style={{ display: 'flex' }}>
            <TransitionGroup className="score-holder scale">
              <CSSTransition key={scoreRight} timeout={500} classNames="scale">
                <div className="blured score">{`✅: ${scoreRight}`}</div>
              </CSSTransition>
            </TransitionGroup>
            <TransitionGroup className="score-holder scale timer">
              <CSSTransition key={timer} timeout={500} classNames="scale">
                <div className="blured score">{timer}</div>
              </CSSTransition>
            </TransitionGroup>
            <TransitionGroup className="score-holder scale">
              <CSSTransition key={scoreWrong} timeout={500} classNames="scale">
                <div className="blured score">{`❌: ${scoreWrong}`}</div>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className="pairs blured">
            {[firstPair, secondPair].map((pair, index) => {
              return (
                <TransitionGroup key={`${index}`} className="pair-holder scale">
                  <CSSTransition key={pair.hash} timeout={500} classNames="scale">
                    <div className="pair">
                      {pair.pair.map(rows => {
                        return (
                          <div className="emoji-row" key={rows.join()}>
                            {rows.map(item => (
                              <div key={item}>
                                <Emoji>{item}</Emoji>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              );
            })}
          </div>
          <div className="blured buttons">
            <button className="thumb down" onClick={this.yes}>
              <Emoji>{`👍${skin[skinColor]}`}</Emoji>
            </button>
            <button className="thumb up" onClick={this.no}>
              <Emoji>{`👎${skin[skinColor]}`}</Emoji>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
