import React from 'react';
import './styles.scss';

interface Props {
  emoji?: string;
  gameSize?: number;
  className?: string;
}

const getClass = (size: number): string => {
  switch (size) {
    case 3:
      return 'three';
    case 4:
      return 'four';
    default:
      return '';
  }
};

const Emoji: React.FC<Props> = props => {
  return (
    <div className={`${getClass(props.gameSize)} emoji__holder ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Emoji;
