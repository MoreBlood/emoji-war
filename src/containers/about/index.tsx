import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs } from '../../helpers/platform';
import { vibrate, VibrationType } from '../../helpers/vibrate';
import List from '../../components/list';
import { computed } from 'mobx';
import { ListItemInterface } from '../../types/listItem';

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

  @computed private get items(): ListItemInterface[] {
    return [
      {
        icon: '🤔',
        name: 'Tutorial',
        number: '',
        id: 'tutorial',
        disabled: false,
        onClick: (): void => vibrate(VibrationType.tap) && this.props.history.push('tutorial'),
      },
      {
        icon: '🔒',
        name: 'Privacy',
        number: '',
        id: 'privacy',
        disabled: false,
        onClick: (): void => vibrate(VibrationType.tap) && this.props.history.push('privacy'),
      },
      {
        icon: '💁🏻',
        name: 'Help & Feedback',
        number: '',
        id: 'help',
        disabled: false,
        onClick: (): void => {
          vibrate(VibrationType.tap);
          window.open('https://emoji-match.fun/build/#/help');
        },
      },
    ];
  }

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="about">
        <div className="logo">🤔</div>
        <div className="thanks blured">
          <big>Big</big> thanks to my friends for great advises and testing this little game <br />
          <div>
            <big className="heart">❤️</big>
            <big className="heart">🧡</big>
            <big className="heart">💛</big>
            <big className="heart">💚</big>
            <big className="heart">💙</big>
            <big className="heart">💜</big>
          </div>
        </div>
        <List listItems={this.items} />
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
