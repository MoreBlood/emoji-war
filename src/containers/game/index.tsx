import React from 'react';
import { Swipeable, EventData } from 'react-swipeable';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore, GameState } from '../../stores/gameStore';
import Emoji from '../../components/emoji';
import { skin } from '../../helpers/emojis';
import { autorun, IReactionDisposer, observable } from 'mobx';
import { SettingsStore } from '../../stores/settingsStore';

type PropsType = RouteComponentProps<{}> & {
  gameStore: GameStore;
  settingsStore: SettingsStore;
};

@withRouter
@inject('gameStore', 'settingsStore')
@observer
class Game extends React.Component<PropsType, null> {
  private gameStore: GameStore;
  private settingsStore: SettingsStore;
  private gameStateChanges: IReactionDisposer;
  private pairs = React.createRef<HTMLDivElement>();

  @observable
  private isAnimating = false;

  @observable
  private offsetX = 0;

  @observable
  private offsetY = 0;

  @observable
  private isSwiping = false;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.settingsStore = this.props.settingsStore;
  }

  private startedAnimating = (): void => {
    this.isAnimating = true;
  };

  private stopedAnimating = (): void => {
    this.isAnimating = false;
  };

  public componentWillMount(): void {
    this.gameStore.restart();
    document.addEventListener('pause', this.pause, false);

    this.gameStateChanges = autorun(() => {
      const { gameState } = this.gameStore;
      switch (gameState) {
        case GameState.gameOver:
          setTimeout(() => this.over(), 1000);
          break;
        default:
          break;
      }
    });
  }

  public componentWillUnmount(): void {
    document.removeEventListener('pause', this.pause, false);
    this.gameStateChanges();
    this.gameStore.stop();
  }

  public onSwipe = (e: EventData): void => {
    const { isPlaying } = this.gameStore;
    const { swipesDisabled } = this.settingsStore;

    if (!isPlaying || swipesDisabled || !this.pairs.current) return;
    this.pairs.current.style.transition = '';
    this.isSwiping = true;

    this.offsetX = -e.deltaX;
    this.offsetY = -e.deltaY;

    const screenWidth = window.innerWidth / 2;

    const maxRotation = (this.offsetX / screenWidth) * 5;
    const maxColor = Math.abs(this.offsetX / screenWidth) + 0.5;

    if (this.offsetX / screenWidth > 0.2) {
      this.pairs.current.style.background = `rgba(104, 125, 247, ${maxColor})`;
    } else if (this.offsetX / screenWidth < -0.2) {
      this.pairs.current.style.background = `rgba(179, 31, 253, ${maxColor})`;
    } else {
      this.pairs.current.style.background = '';
    }

    this.pairs.current.style.transform = `translateX(${this.offsetX}px) scale(1.05) translateY(${this.offsetY}px) rotate(${maxRotation}deg)`;
  };

  public onSwiped = (): void => {
    this.isSwiping = false;

    if (!this.pairs.current) return;

    this.pairs.current.style.transition = 'all 0.2s linear';
    const screenWidth = window.innerWidth / 2;

    if (Math.abs(this.offsetX / screenWidth) < 0.5) {
      this.resetPairsPosition(true);
    } else {
      this.pairs.current.style.transform = `
        translateX(${Math.sign(this.offsetX) * window.innerWidth}px)
        translateY(${this.offsetY}px)
        rotate(${Math.sign(this.offsetX) * 10}deg)
       `;

      this.pairs.current.style.background = '';

      if (this.offsetX > 0) {
        this.yes();
      } else {
        this.no();
      }

      setTimeout(() => {
        this.resetPairsPosition();
      }, 300);
    }
  };

  private resetPairsPosition(withAnimation = false): void {
    if (!withAnimation) {
      this.pairs.current.style.transition = '';
    }

    this.offsetX = 0;
    this.offsetY = 0;

    this.pairs.current.style.background = '';
    this.pairs.current.style.transform = 'translateX(0px) rotate(0deg) scale(1)';
  }

  private yes = (): void => this.gameStore.voteForPairs(true);
  private no = (): void => this.gameStore.voteForPairs(false);
  private switch = (): void => this.settingsStore.switchGameSize();
  private menu = (): void => this.props.history.push('');
  private over = (): void => this.props.history.push('/gameOver');
  private togglePause = (): void => {
    if (!this.isAnimating) this.gameStore.switchPause();
  };
  private pause = (): void => {
    this.gameStore.pause();
  };

  public render(): React.ReactNode {
    const {
      firstPair,
      secondPair,
      timer,
      scoreRight,
      gameLifes,
      skinColor,
      isPlaying,
      lifes,
      isPaused,
    } = this.gameStore;

    const { gameSize } = this.settingsStore;

    return (
      <div className="game">
        <TransitionGroup>
          <CSSTransition
            key={isPaused ? 'paused' : 'not-paused'}
            timeout={600}
            onEnter={this.startedAnimating}
            onExited={this.stopedAnimating}
            classNames="opacity"
          >
            <div className="pause">
              {isPaused ? (
                <div>
                  <div className="logo">😴</div>
                  <button className="button play blured scale" onClick={this.togglePause}>
                    ▶️
                  </button>
                </div>
              ) : null}
            </div>
          </CSSTransition>
        </TransitionGroup>
        <div className={isPaused ? 'paused gameFieldHolder' : 'gameFieldHolder'}>
          <div className="gameField">
            {/* <div className="blured score debug">
            {firstPair.hash}
            {comparePairs ? ' = ' : ' != '}
            {secondPair.hash}
          </div> */}
            <div className="topBar" style={{ display: 'flex' }}>
              <div className="score-holder button-holder">
                <div className="blured score">
                  <button disabled={!isPlaying} className="thumb switch" onClick={this.menu}>
                    ⏪
                  </button>
                </div>
              </div>
              <TransitionGroup className="score-holder scale">
                <CSSTransition key={scoreRight} timeout={500} classNames="scale">
                  <div className="blured score">{`🔥 ${scoreRight}`}</div>
                </CSSTransition>
              </TransitionGroup>
              <TransitionGroup
                className="score-holder scale timer"
                style={{ width: `${timer.toString().length * 1.4}vh` }}
              >
                <CSSTransition key={timer} timeout={500} classNames="scale">
                  <div className="blured score">{timer}</div>
                </CSSTransition>
              </TransitionGroup>
              <div className="score-holder lifes blured">
                {Array.from({ length: gameLifes }, () => '❤️').map((heart, index) => (
                  <span key={index} className="life" style={{ opacity: index < lifes ? 1 : 0.1 }}>
                    {heart}
                  </span>
                ))}
              </div>
              <div className="score-holder button-holder">
                <div className="blured score">
                  <button disabled={!isPlaying} className="thumb switch" onClick={this.togglePause}>
                    ⏸️
                  </button>
                </div>
              </div>
            </div>
            <Swipeable className="gameField" onSwiping={this.onSwipe} onSwiped={this.onSwiped}>
              <div ref={this.pairs} className="pairs blured">
                {[firstPair, secondPair].map((pair, index) => {
                  return (
                    <TransitionGroup key={`${index}`} className="pair-holder scale">
                      <CSSTransition
                        key={pair.hash}
                        timeout={500}
                        classNames="scale"
                        unmountOnExit
                        onEnter={this.startedAnimating}
                        onExited={this.stopedAnimating}
                      >
                        <div className="pair">
                          {pair.pair.map(rows => {
                            return (
                              <div className="emoji-row" key={rows.join()}>
                                {rows.map((item, index) => (
                                  <div key={item + index}>
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
            </Swipeable>
            <div className="blured buttons">
              <button
                disabled={!isPlaying || this.isAnimating}
                className="thumb up"
                onClick={this.no}
              >
                <Emoji>{`👎${skin[skinColor]}`}</Emoji>
              </button>
              <button
                disabled={!isPlaying || this.isAnimating}
                className="thumb down"
                onClick={this.yes}
              >
                <Emoji>{`👍${skin[skinColor]}`}</Emoji>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
