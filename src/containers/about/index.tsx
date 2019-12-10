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
import { skin } from '../../helpers/emojis';

type PropsType = RouteComponentProps<{}>;

@(withRouter as any)
@observer
class About extends React.Component<PropsType> {
  public constructor(props?: PropsType) {
    super(props);
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private menu = (): void => this.props.history.goBack();

  public render(): React.ReactNode {
    return (
      <div className="about">
        <div className="logo">🤔</div>
        <div className="thanks blured">
          <big>FAQ:</big> Compare shuffled emoticons from top to bottom <br />
          <big>Big</big> thanks to my friends for great advises and testing this little game <br />
          <big className="heart">❤️</big>
          <big className="heart">🧡</big>
          <big className="heart">💛</big>
          <big className="heart">💚</big>
          <big className="heart">💙</big>
          <big className="heart">💜</big>
          <br />
          I’ve made this for fun.
        </div>
        <div className="all-buttons">
          <div className="buttons">
            <button className="button back blured" onClick={this.menu}>
              ⏪
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
