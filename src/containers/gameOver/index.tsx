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

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('/game');
  private menu = (): void => this.props.history.push('/');
  private settings = (): void => this.props.history.push('/settings');
  private store = (): void => this.props.history.push('store');

  public render(): React.ReactNode {
    const { highScore } = this.settingsStore;
    const isTop = this.score === highScore;
    return (
      <div className="gameOver">
        <button className="blured thanks">
          {isTop ? '👑 ' : ''}
          {numberToEmojiString(this.score)}
        </button>
        <div className="blured highscore" style={{ visibility: isTop ? 'hidden' : 'visible' }}>
          👑 {highScore}
        </div>
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
            <button className="button small blured" onClick={this.store}>
              🛒
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

export default GameOver;
