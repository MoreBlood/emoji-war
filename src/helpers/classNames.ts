/*
 * File Created: Friday, 24th April 2020 1:54:35 pm
 * Author: Artihovich Kirill (k_artikhovich@wargaming.net)
 * -----
 * Last Modified: Friday, 24th April 2020 1:54:44 pm
 * Modified By: Artihovich Kirill (k_artikhovich@wargaming.net)
 * -----
 * Copyright 2020 ALL RIGHTS RESERVED, Wargaming
 */
export default function classNames(...args: any[]): string {
  const classes = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    // eslint-disable-next-line no-continue
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      // eslint-disable-next-line prefer-spread
      const inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in arg) {
        if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
