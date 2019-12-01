import React from 'react';
import './styles.scss';

interface Props {
  emoji?: string;
}

const Emoji: React.FC<Props> = props => {
  return <div className="emoji__holder">{props.children}</div>;
};

export default Emoji;
