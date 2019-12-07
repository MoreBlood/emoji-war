import React from 'react';
import './styles.scss';

interface Props {
  emoji?: string;
  gameSize?: number;
}

const Emoji: React.FC<Props> = props => {
  return <div className={`${props.gameSize === 3 ? 'three' : ''} emoji__holder`}>{props.children}</div>;
};

export default Emoji;
