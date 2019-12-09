import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore, GameState } from '../../stores/gameStore';
import Emoji from '../../components/emoji';
import { randomInteger } from '../../helpers/math';
import { skin } from '../../helpers/emojis';
import { autorun, IReactionDisposer } from 'mobx';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
};

@(withRouter as any)
@inject('gameStore')
@observer
class Game extends React.Component<PropsType, null> {
  private gameStore: GameStore;
  private gameStateChanges: IReactionDisposer;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
  }

  public componentWillMount(): void {
    this.gameStore.restart();

    this.gameStateChanges = autorun(() => {
      const { gameState } = this.gameStore;
      switch (gameState) {
        case GameState.gameOver:
          this.menu();
          break;
        default:
          break;
      }
    });
  }

  public componentWillUnmount(): void {
    this.gameStateChanges();
  }

  private yes = (): void => this.gameStore.voteForPairs(true);
  private no = (): void => this.gameStore.voteForPairs(false);
  private switch = (): void => this.gameStore.switchGameMode();
  private menu = (): void => this.props.history.push('');
  private restart = (): void => this.gameStore.restart();

  public render(): React.ReactNode {
    const {
      firstPair,
      secondPair,
      timer,
      scoreRight,
      scoreWrong,
      gameSizeEmoji,
      gameLifes,
      gameSize,
      skinColor,
      lifes,
    } = this.gameStore;
    return (
      <div className="App">
        <div className="gameField">
          {/* <div className="blured score debug">
            {firstPair.hash}
            {comparePairs ? ' = ' : ' != '}
            {secondPair.hash}
          </div> */}
          <div className="topBar" style={{ display: 'flex' }}>
            <div className="score-holder timer">
              <div className="blured score">
                <button className="thumb switch" onClick={this.menu}>
                  ⏪
                </button>
              </div>
            </div>
            <TransitionGroup className="score-holder scale">
              <CSSTransition key={scoreRight} timeout={500} classNames="scale">
                <div className="blured score">{`🔥 ${scoreRight}`}</div>
              </CSSTransition>
            </TransitionGroup>
            <TransitionGroup className="score-holder scale timer">
              <CSSTransition key={timer} timeout={500} classNames="scale">
                <div className="blured score">{timer}</div>
              </CSSTransition>
            </TransitionGroup>
            <TransitionGroup className="score-holder lifes scale">
              <CSSTransition key={lifes} timeout={500} classNames="scale">
                <div className="blured score">
                  {Array.from({ length: gameLifes }, () => '❤️').map((heart, index) => (
                    <span key={index} style={{ opacity: index < lifes ? 1 : 0.1 }}>
                      {heart}
                    </span>
                  ))}
                </div>
              </CSSTransition>
            </TransitionGroup>
            <div className="score-holder timer">
              <div className="blured score">
                <button className="thumb switch" onClick={this.restart}>
                  🔄
                </button>
              </div>
            </div>
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
                                <Emoji gameSize={gameSize}>{item}</Emoji>
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

export default Game as React.ComponentType<any>;
