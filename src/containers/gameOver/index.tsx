import React from 'react';
import { inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';

import { GameStore } from '../../stores/gameStore';
import { numberToEmojiString } from '../../helpers/emojis';
import { SettingsStore } from '../../stores/settingsStore';

type PropsType = RouteComponentProps<{}> & {
  gameStore?: GameStore;
  settingsStore?: SettingsStore;
};

@withRouter
@inject('gameStore', 'settingsStore')
class GameOver extends React.Component<PropsType> {
  private gameStore: GameStore;
  private settingsStore: SettingsStore;
  private score = 0;
  private emoji = this.props.gameStore.randomSadOrHappyEmoticon;

  public constructor(props: PropsType) {
    super(props);

    this.gameStore = this.props.gameStore;
    this.settingsStore = this.props.settingsStore;
    this.score = this.gameStore.scoreRight;
  }

  public componentWillMount(): void {
    window.ga?.trackView('Game Over');
    window.ga?.trackEvent('Game', 'Score', 'Game Over Score', this.score);

    var data = {
      score: this.score,
      leaderboardId: 'top_scores',
    };
    window.gamecenter?.submitScore(
      () => {},
      () => {},
      data,
    );
  }

  private leaderboard = (): void => {
    var data = {
      leaderboardId: 'top_scores',
    };
    window.gamecenter?.showLeaderboard(
      board => console.log(board),
      err => console.log(err),
      data,
    );
  };

  public componentWillUnmount(): void {}

  private start = (): void => {
    window.ga?.trackEvent('Game', 'Restart');
    this.props.history.push('/game');
  };
  private menu = (): void => this.props.history.push('/');
  private settings = (): void => this.props.history.push('/settings');
  private store = (): void => this.props.history.push('store');
  private share = (): void => {
    const { scoreRight } = this.gameStore;
    const { highScore } = this.settingsStore;
    window.ga?.trackEvent('Game', 'Share');

    const message = `Hey, just scored ${scoreRight} in The Emoji Match 🔥\nMy top is ${highScore} 👑\nhttps://moreblood.github.io/emoji-war/build/#/download`;

    var options = {
      message, // not supported on some apps (Facebook, Instagram)
      text: message,
      subject: message, // fi. for email
      // files: ['www/og-image.jpg'],
      // url: 'https://moreblood.github.io/emoji-war/build/',
      chooserTitle: 'The Emoji Match 🔥', // Android only, you can override the default share sheet title
    };

    window.plugins.socialsharing.shareWithOptions(options);
  };

  public render(): React.ReactNode {
    const { highScore, isDemo } = this.settingsStore;
    const isTop = this.score === highScore;
    const showShare = window.plugins && window.plugins.socialsharing;

    return (
      <div className="gameOver">
        <button onClick={this.leaderboard} className="blured thanks">
          {isTop ? '👑 ' : ''}
          {numberToEmojiString(this.score)}
        </button>
        <div
          onClick={this.leaderboard}
          className="blured highscore"
          style={{ visibility: isTop ? 'hidden' : 'visible' }}
        >
          👑 {highScore}
        </div>
        <div className="all-buttons">
          <div className="buttons">
            <button className="button play blured" onClick={this.start}>
              🔄
            </button>
          </div>
          <div className="buttons">
            <button disabled={isDemo} className="button small blured" onClick={this.menu}>
              🏠
            </button>
            <button disabled={isDemo} className="button small blured" onClick={this.store}>
              🛒
            </button>
            {showShare ? (
              <button className="button small blured" onClick={this.share}>
                🔗
              </button>
            ) : null}
            <button disabled={isDemo} className="button small blured" onClick={this.settings}>
              ⚙️
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
