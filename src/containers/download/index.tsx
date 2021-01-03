import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs } from '../../helpers/platform';

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

  private start = (): void => this.props.history.push('game');
  private menu = (): void => this.props.history.push('/');

  private iframe = React.createRef<HTMLIFrameElement>();

  public componentDidMount(): void {
    if (this.iframe.current) {
      this.iframe.current.addEventListener('load', ev => {
        const newStyle = document.createElement('style');
        newStyle.textContent =
          '.gameField, .gameOver, .about, .settings, .menu, .store { padding-top: 3vh; }';
        (ev.target as any).contentDocument.head.appendChild(newStyle);
      });
    }
  }

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="download">
        <h2 className="top-text">Decide</h2>
        <p className="secondary-text">if the top emojies are the same as bottom</p>
        <div className="game-wrap">
          <div className="iphone"></div>
          <iframe ref={this.iframe} src="/#/game?mode=demo"></iframe>
        </div>
      </div>
    );
  }
}

export default About;
