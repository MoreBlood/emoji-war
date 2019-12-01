import React from 'react';
import './styles.scss';

const text = '404';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'fiollet'];

const NotFound: React.FC = () => {
  return (
    <div className="notFound__holder">
      {colors.map(
        (color): React.ReactNode => (
          <div key={color} className={`notFound ${color}`}>
            <h1>{text}</h1>
          </div>
        ),
      )}
    </div>
  );
};

export default NotFound;
