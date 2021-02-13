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
import Emoji from '../../components/emoji';
import { vibrate, VibrationType } from '../../helpers/vibrate';

type PropsType = RouteComponentProps<{}> & {
  settingsStore: SettingsStore;
};

@withRouter
@inject('settingsStore')
@observer
class Tutorial extends React.Component<PropsType, null> {
  private settingsStore: SettingsStore;

  public constructor(props?: PropsType) {
    super(props);
    this.settingsStore = this.props.settingsStore;
    this.setup();

    this.isFirstTimeNative = !this.settingsStore.firstTime && isNative();
    this.isFirstTime = this.settingsStore.firstTime;
  }

  @observable private isPlaying = false;

  public componentWillMount(): void {
    if (window.webGa) {
      window.webGa('set', 'page', 'download');
      window.webGa('send', 'pageview');
    }
    this.settingsStore.firstTime = false;
  }

  public componentWillUnmount(): void {}

  public playFirstPart = (): void => {
    // this.firstPartTimeline.play();

    this.isPlaying = true;

    anime({
      targets: '.pairs',
      scale: [0, 1],
      opacity: [0, 1],
    });

    anime({
      targets: '.start.buttons',
      scale: [1, 0],
      opacity: [1, 0],
    });

    anime({
      targets: '.logo-big',
      cale: [1, 0],
      opacity: [1, 0],
    });

    anime({
      targets: '.text-wrap.first > .top-text',
      translateX: ['10vh', 0],
      opacity: [0, 1],
      endDelay: 3000,
      complete: (): void => {
        this.firstPartTimeline.play();
        this.firstPartTextTimeline.play();
      },
    });

    this.firstPartTextTimeline.complete = (anim): void => {
      if (!anim.reversed) {
        this.playSecondPart();

        anime({
          targets: '.pairs',
          scale: [0, 1],
          opacity: [0, 1],
        });
      }
    };
  };
  public playSecondPart(): void {
    this.secondPartTimeline.play();
  }

  private isFirstTimeNative: boolean = false;

  private isFirstTime: boolean = false;

  public createFirstPart(): void {
    const firstAnimationStart = 0;

    anime({
      targets: '.text-wrap.first > .top-text',
      translateX: '10vh',
      opacity: 0,
      duration: 0,
    });

    anime({
      targets: '.pairs',
      scale: 0,
      opacity: 0,
      duration: 0,
    });

    anime({
      targets: '.logo-big',
      scale: 1,
      opacity: 1,
      duration: 0,
    });

    this.firstPartTimeline
      .add(
        {
          targets: '.pair.top > .emoji__holder.first',
          translateX: [0, `-${this.emojiSize}vh`],
          translateY: [0, `${this.size - this.emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.pair.top > .emoji__holder.second',
          translateX: [0, `${this.emojiSize}vh`],
          translateY: [0, `${this.size - this.emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.pair.bottom > .emoji__holder.third',
          translateX: [0, `${this.emojiSize * 2}vh`],
          translateY: [0, `-${this.size - this.emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.pair.bottom > .emoji__holder.fourth',
          // translateX: [0, `${emojiSize}vh`],
          translateY: [0, `-${this.size - this.emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.pair.bottom > .emoji__holder.second',
          translateX: [0, `-${this.emojiSize}vh`],
          // translateY: [0, `-${size - emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.pair.bottom > .emoji__holder.first',
          translateX: [0, `-${this.emojiSize}vh`],
          // translateY: [0, `-${size - emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.border > .equality',
          opacity: [0, 1],
          scale: [0, 1],
          delay: anime.stagger(150),
          // translateY: [0, `-${size - emojiSize}vh`],
        },
        firstAnimationStart,
      )
      .add(
        {
          targets: '.border',
          borderColor: ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)'],
          // translateY: [0, `-${size - emojiSize}vh`],
        },
        firstAnimationStart,
      );

    this.firstPartTextTimeline
      .add({
        targets: '.text-wrap.first > .top-text',
        translateX: [0, '-10vh'],
        opacity: [1, 0],
      })
      .add(
        {
          targets: '.text-wrap.second > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        firstAnimationStart + 100,
      )
      .add(
        {
          targets: '.pairs',
          opacity: [1, 0],
          scale: [1, 0],
          complete: (): void => {
            this.firstPair[0].emoji = '😀';
            this.firstPair[1].emoji = '👌🏾';
            this.firstPair[2].emoji = '🧚🏻‍♀️';
            this.firstPair[3].emoji = '😘';

            this.secondPair[0].emoji = '😀';
            this.secondPair[1].emoji = '👧';
            this.secondPair[2].emoji = '👌';
            this.secondPair[3].emoji = '😘';
          },
        },
        5000,
      )
      .add(
        {
          targets: '.text-wrap.second > .top-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
          endDelay: 500,
          begin: (): void => {
            this.firstPartTimeline.reverse();
            this.firstPartTimeline.play();
          },
        },
        5000,
      );
  }

  public createSecondPart(): void {
    const duration = 1000;

    this.secondPartTimeline
      .add(
        {
          targets: '.text-wrap.third > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        0,
      )
      .add(
        {
          targets: '.text-wrap.third > .top-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration * 6,
      )
      .add(
        {
          targets: '.text-wrap.fourth > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
          begin: (): void => {
            this.equality = '≠';
            this.firstPartTimeline.reverse();
            this.firstPartTimeline.play();
          },
        },
        duration * 6 + 100,
      )
      .add(
        {
          targets:
            '.pair.top > .emoji__holder.first, .pair.top > .emoji__holder.second, .pair.top > .emoji__holder.fourth, .pair.bottom > .emoji__holder.first, .pair.bottom > .emoji__holder.third, .pair.bottom > .emoji__holder.fourth',
          opacity: [1, 0.5],
        },
        duration * 6 + 500,
      )
      .add(
        {
          targets: '.text-wrap.fourth > .top-text',
          translateX: [0, '-10vh'],
          opacity: [1, 0],
        },
        duration * 10,
      )
      .add(
        {
          targets: '.pairs',
          opacity: 0,
          scale: 0,
        },
        duration * 10,
      )
      .add(
        {
          targets: '.text-wrap.fifth > .top-text',
          translateX: ['10vh', 0],
          opacity: [0, 1],
        },
        duration * 10 + 100,
      )
      .add(
        {
          targets: '.logo-big',
          opacity: [0, 1],
          scale: [0, 1],
        },
        duration * 10 + 800,
      )
      .add(
        {
          targets: '.end.buttons',
          opacity: [0, 1],
          scale: [0, 1],
          begin: (): void => {
            this.isPlaying = false;
          },
        },
        duration * 10 + 1200,
      );
  }

  public size = 20;
  public emojiSize = 7 + 1.5 * 2;

  public firstPartTimeline!: anime.AnimeTimelineInstance;
  public firstPartTextTimeline!: anime.AnimeTimelineInstance;
  public secondPartTimeline!: anime.AnimeTimelineInstance;

  public componentDidMount(): void {
    this.restart();
  }

  private setup(): void {
    this.equality = '=';
    this.firstPair = [
      {
        name: 'first',
        emoji: '😂',
      },
      {
        name: 'second',
        emoji: '👧',
      },
      {
        name: 'third',
        emoji: '👎',
      },
      {
        name: 'fourth',
        emoji: '💃',
      },
    ];

    this.secondPair = [
      {
        name: 'first',
        emoji: '😂',
      },
      {
        name: 'second',
        emoji: '👎🏻',
      },
      {
        name: 'third',
        emoji: '👧🏾',
      },
      {
        name: 'fourth',
        emoji: '💃',
      },
    ];
  }

  private play = (): void => {
    this.restart();
    this.playFirstPart();
  };

  private restart = (): void => {
    this.setup();
    this.firstPartTimeline = anime.timeline({ loop: false, autoplay: false });
    this.firstPartTextTimeline = anime.timeline({ loop: false, autoplay: false });
    this.secondPartTimeline = anime.timeline({ loop: false, autoplay: false });

    this.createFirstPart();
    this.createSecondPart();
  };

  private start = (): void => vibrate(VibrationType.tap) && this.props.history.push('game');

  private about = (): void => vibrate(VibrationType.tap) && this.props.history.goBack();

  @observable private equality = '=';

  @observable private firstPair: { name: string; emoji: string }[] = [];

  @observable private secondPair: { name: string; emoji: string }[] = [];

  public render(): React.ReactNode {
    const { platform } = this.settingsStore;

    return (
      <div className="tutorial">
        <div className="background"></div>
        <div className="background gradient"></div>
        <div className={classNames('navigation', { visible: this.isFirstTimeNative })}>
          <button onClick={this.about} className="back">
            {'<'} Back
          </button>
        </div>
        <div className="wrap">
          <div className="text">
            <div className="text-wrap first">
              <h2 className="top-text">Are they equal?</h2>
              {/* <p className="secondary-text">if the top emojies are the same as bottom</p> */}
            </div>
            <div className="text-wrap second">
              <h2 className="top-text">Yes!</h2>
              {/* <p className="secondary-text">🖐️ = 🖐🏿 = 🖐🏻 = 🖐🏼 = 🖐🏽 = 🖐🏾</p> */}
            </div>
            <div className="text-wrap third">
              <h2 className="top-text">And this ones?</h2>
              {/* <p className="secondary-text">earn coins and spend them in game store</p> */}
            </div>
            <div className="text-wrap fourth">
              <h2 className="top-text">No</h2>
              {/* <p className="secondary-text">earn coins and spend them in game store</p> */}
            </div>
            <div className="text-wrap fifth">
              <h2 className="top-text">Easy? Let&apos;s go!</h2>
              {/* <p className="secondary-text">earn coins and spend them in game store</p> */}
            </div>
          </div>
          <div className="pairs">
            <div className="pair top">
              {this.firstPair.map(e => (
                <Emoji key={e.name} className={e.name}>
                  {e.emoji}
                </Emoji>
              ))}
            </div>
            <div className="border">
              <div className="equality first">=</div>
              <div className="equality second">{this.equality}</div>
              <div className="equality third">=</div>
              <div className="equality fourth">=</div>
            </div>
            <div className="pair bottom">
              {this.secondPair.map(e => (
                <Emoji key={e.name} className={e.name}>
                  {e.emoji}
                </Emoji>
              ))}
            </div>
          </div>
          <div className="tutorial-logo">
            <div className="logo-big"></div>
            <div className="end buttons">
              <button className="button play blured" onClick={this.start}>
                ▶️
              </button>
              <button
                onClick={this.play}
                disabled={this.isPlaying}
                className="button small blured visible"
              >
                🔁 Repeat Tutorial
              </button>
            </div>
            <div className="start buttons">
              <button className="button play blured" onClick={this.play}>
                📖
              </button>
              <button
                onClick={this.start}
                // disabled={this.isPlaying}
                className={classNames('button small blured', {
                  visible: this.isFirstTime,
                })}
              >
                ⏭️ Skip Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tutorial;
