import { StoreItem } from '../../types/storeItem';

export const inGameStoreItems = [
  new StoreItem({ name: 'Tarantino dream', id: 'TARANTINO_GAME_MODE', icon: '🦶', price: 150 }),
  new StoreItem({ name: 'Extra life', id: 'EXTRA_LIFE', icon: '❤️', price: 500 }),
  new StoreItem({
    name: 'Slow down',
    id: 'SLOW_DOWN',
    icon: '🕐',
    price: 50,
    description: 'Use one time per game, for 3 pairs',
  }),
];
