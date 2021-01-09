import { StoreItem } from '../../types/storeItem';

const priceMultiplier = 10;

export const inGameStoreItems = [
  new StoreItem({
    name: 'Tarantino dream',
    id: 'TARANTINO_GAME_MODE',
    icon: '🦶',
    price: 15 * priceMultiplier,
  }),
  new StoreItem({
    name: 'Covid nightmare',
    id: 'COVID_GAME_MODE',
    icon: '🦠',
    price: 10 * priceMultiplier,
  }),
  new StoreItem({ name: 'Regular', id: 'REGULAR_GAME_MODE', icon: '🎲', price: 0, hidden: true }),
  new StoreItem({ name: 'Pew pew', id: 'PEW_GAME_MODE', icon: '👊', price: 15 * priceMultiplier }),
  new StoreItem({ name: 'Extra life', id: 'EXTRA_LIFE', icon: '❤️', price: 50 * priceMultiplier }),
  new StoreItem({
    name: 'Slow down',
    id: 'SLOW_DOWN',
    icon: '🕐',
    price: 50 * priceMultiplier,
    inDev: true,
    description: 'Use one time per game, for 3 pairs',
  }),
];
