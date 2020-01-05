import React from 'react';
import './styles.scss';
import { ListItemInterface } from '../../types/listItem';

interface Props {
  listItems: ListItemInterface[];
}

const List: React.FC<Props> = props => {
  return (
    <div className="list_holder">
      {Array.from(
        props.listItems.map(item => {
          return (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={item.onClick}
              className="button small blured"
            >
              <span>
                <span className="emoji">{item.icon}</span>{' '}
                <span className="setting-item-text">{item.name}</span>
              </span>{' '}
              <span className="price">{item.number}</span>
            </button>
          );
        }),
      )}
    </div>
  );
};

export default List;
