import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs, isNative } from '../../helpers/platform';
import classNames from '../../helpers/classNames';
import { observable } from 'mobx';
import anime from 'animejs';
import { vibrate, VibrationType } from '../../helpers/vibrate';

type PropsType = RouteComponentProps<{}> & {
  settingsStore: SettingsStore;
};

@withRouter
@inject('settingsStore')
@observer
class Help extends React.Component<PropsType, null> {
  private settingsStore: SettingsStore;

  public constructor(props?: PropsType) {
    super(props);
    this.settingsStore = this.props.settingsStore;
  }

  public componentWillMount(): void {
    if (window.webGa) {
      window.webGa('set', 'page', 'privacy');
      window.webGa('send', 'pageview');
    }
  }

  private about = (): void => vibrate(VibrationType.tap) && this.props.history.goBack();

  public componentWillUnmount(): void {}

  public componentDidMount(): void {}

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="help">
        <div className={classNames('navigation', { visible: isNative() })}>
          <button onClick={this.about} className="back">
            {'<'} Back
          </button>
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSc7YEa4T33Ypf3Kffrfo0ykn8IChU49o17h5HOOGFDDGk5Wng/viewform?embedded=true"
          // width="100%"
          // height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          scrolling="no"
        >
          Loading...
        </iframe>
      </div>
    );
  }
}

export default Help;
