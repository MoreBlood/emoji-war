import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './styles.scss';
import '../../styles/global.scss';
import '../../styles/adaptive.scss';
import { SettingsStore } from '../../stores/settingsStore';
import { isIOs } from '../../helpers/platform';
import classNames from '../../helpers/classNames';
import { observable } from 'mobx';
import anime from 'animejs';

type PropsType = RouteComponentProps<{}> & {
  settingsStore: SettingsStore;
};

@withRouter
@inject('settingsStore')
@observer
class Download extends React.Component<PropsType, null> {
  private settingsStore: SettingsStore;

  public constructor(props?: PropsType) {
    super(props);
    this.settingsStore = this.props.settingsStore;
  }

  public componentWillMount(): void {
    if (window.webGa) {
      window.webGa('set', 'page', 'download');
      window.webGa('send', 'pageview');
    }
  }

  public componentWillUnmount(): void {}

  private start = (): void => this.props.history.push('game');
  private menu = (): void => this.props.history.push('/');

  private iframe = React.createRef<HTMLIFrameElement>();

  @observable private isInteractingWithIframe = false;

  private onFrameClick = (): void => {
    if (!this.isInteractingWithIframe) {
      anime({
        targets: '.helper',
        scale: [1, 0.5],
        opacity: [1, 0],
        delay: 200,
        duration: 1000,
      });
    }
    this.isInteractingWithIframe = true;
  };

  public componentDidMount(): void {
    if (this.iframe.current) {
      this.iframe.current.addEventListener('load', ev => {
        anime({
          targets: '.game-wrap',
          translateX: ['20vh', 0],
          opacity: [0, 1],
          delay: 0,
        });

        anime({
          targets: '.helper',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 700,
          delay: 500,
        });
        const newStyle = document.createElement('style');
        newStyle.textContent =
          '.gameField, .gameOver, .about, .settings, .menu, .store { padding-top: 0vh; }';
        (ev.target as any).contentDocument.head.appendChild(newStyle);
      });

      window.addEventListener('message', e => {
        if (e.data == 'isPlaying') {
          this.onFrameClick();
        }
      });
    }

    const timeline = anime.timeline({ loop: true });

    const duration = 5000;

    // anime({
    //   targets: '.background',
    //   // background: ['#8453E3', '#0EEDF1'],
    //   duration: duration * 3,
    //   easing: 'linear',
    //   // round: 1,
    //   loop: true,
    //   direction: 'alternate',
    //   update: (a): void => {
    //     const { currentValue } = a.animations[0] as any;
    //     const { target } = a.animatables[0] as any;
    //     // target.style.background = `radial-gradient(125.82% 125.82% at 50% 138%, ${currentValue} 0%, #fff 100%)`;
    //   },
    // });

    anime({
      targets: '.app-store-button',
      scale: [0, 1],
      opacity: [0, 1],
      delay: 1000,
    });

    timeline
      .add(
        {
          targets: '.text-wrap.first > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        0,
      )
      .add(
        {
          targets: '.text-wrap.first > .secondary-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        100,
      )
      .add(
        {
          targets: '.text-wrap.first > .top-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration,
      )
      .add(
        {
          targets: '.text-wrap.first > .secondary-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration + 100,
      )
      .add(
        {
          targets: '.text-wrap.second > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        duration + 100,
      )
      .add(
        {
          targets: '.text-wrap.second > .secondary-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        duration + 200,
      )
      .add(
        {
          targets: '.text-wrap.second > .top-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration * 2,
      )
      .add(
        {
          targets: '.text-wrap.second > .secondary-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration * 2 + 100,
      )
      .add(
        {
          targets: '.text-wrap.third > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        duration * 2 + 100,
      )
      .add(
        {
          targets: '.text-wrap.third > .secondary-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        duration * 2 + 200,
      )
      .add(
        {
          targets: '.text-wrap.third > .top-text',
          translateX: [0, '-10vh'],
        },
        duration * 3,
      )
      .add(
        {
          targets: '.text-wrap.third > .secondary-text',
          translateX: [0, '-10vh'],
        },
        duration * 3 + 100,
      )
      .add(
        {
          targets: '.text-wrap.third > .secondary-text',
          opacity: [1, 0],
          easing: 'linear',
          duration: 200,
        },
        duration * 3 + 100,
      )
      .add(
        {
          targets: '.text-wrap.third > .top-text',
          opacity: [1, 0],
          easing: 'linear',
          duration: 200,
        },
        duration * 3,
      );
  }

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="download">
        <div className="background"></div>
        <div className="background gradient"></div>
        <div className="text">
          <div className="text-wrap first">
            <h2 className="top-text">Decide</h2>
            <p className="secondary-text">if the top emojies are the same as bottom</p>
          </div>
          <div className="text-wrap second">
            <h2 className="top-text">Be careful!</h2>
            <p className="secondary-text">🖐️ = 🖐🏿 = 🖐🏻 = 🖐🏼 = 🖐🏽 = 🖐🏾</p>
          </div>
          <div className="text-wrap third">
            <h2 className="top-text">New modes</h2>
            <p className="secondary-text">earn coins and spend them in game store</p>
          </div>
        </div>
        <a href="#" className="app-store-button-wrap">
          <button className="app-store-button"></button>
        </a>
        <div className="game-wrap" style={{ opacity: 0 }}>
          <div className="iphone"></div>
          <iframe ref={this.iframe} src="./#/game?mode=demo"></iframe>
          <div className={classNames('helper')}></div>
        </div>
      </div>
    );
  }
}

export default Download;
