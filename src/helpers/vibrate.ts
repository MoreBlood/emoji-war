import { isIOs, isAndroid } from './platform';

export enum VibrationType {
  wrong,
  tap,
}

export const vibrate = (type: VibrationType): boolean => {
  switch (type) {
    case VibrationType.tap: {
      if (isIOs()) {
        window.TapticEngine.impact({
          style: 'light',
        });
      } else if (isAndroid()) {
        window.navigator.vibrate(1);
      }
      break;
    }
    case VibrationType.wrong: {
      if (isIOs()) {
        window.TapticEngine.unofficial.burst();
      } else if (isAndroid()) {
        window.navigator.vibrate(200);
      }
      break;
    }
  }
  return true;
};
