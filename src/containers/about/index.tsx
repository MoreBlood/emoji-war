import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs } from '../../helpers/platform';
import { vibrate, VibrationType } from '../../helpers/vibrate';

type PropsType = RouteComponentProps<{}> & {
  settingsStore: SettingsStore;
};

@withRouter
@inject('settingsStore')
@observer
class About extends React.Component<PropsType, null> {
  private settingsStore: SettingsStore;

  public constructor(props?: PropsType) {
    super(props);
    this.settingsStore = this.props.settingsStore;
  }

  public componentWillMount(): void {}

  public componentWillUnmount(): void {}

  private menu = (): void => vibrate(VibrationType.tap) && this.props.history.push('/');

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="about">
        <div className="logo">🤔</div>
        <div className="thanks blured">
          <big>FAQ:</big> Compare shuffled emoticons from top to bottom <br />
          <big>Big</big> thanks to my friends for great advises and testing this little game <br />
          <div>
            <big className="heart">❤️</big>
            <big className="heart">🧡</big>
            <big className="heart">💛</big>
            <big className="heart">💚</big>
            <big className="heart">💙</big>
            <big className="heart">💜</big>
          </div>
          I’ve made this for fun.
          <br />
          Platform: {platform}
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
