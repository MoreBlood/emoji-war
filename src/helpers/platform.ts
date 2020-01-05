import { Parser } from './enum';

export enum Platform {
  android,
  cordova,
  core,
  ios,
  ipad,
  iphone,
  mobile,
  mobileweb,
  phablet,
  tablet,
  windows,
}

export const isNative = (): boolean => {
  if (!window.device) {
    return false;
  }
  const platform: Platform = Parser.parseEnum(window.device.platform, Platform);

  switch (platform) {
    case Platform.android:
    case Platform.ios:
    case Platform.ipad:
    case Platform.iphone:
    case Platform.mobile:
    case Platform.phablet:
    case Platform.tablet:
      return true;
    default:
      return false;
  }
};

export const isBrowser = (): boolean => !isNative();

export const isIOs = (): boolean => {
  if (!window.device) {
    return false;
  }
  const platform: Platform = Parser.parseEnum(window.device.platform, Platform);

  console.log(platform);

  switch (platform) {
    case Platform.ios:
    case Platform.ipad:
    case Platform.iphone:
      return true;
    default:
      return false;
  }
};

export const isAndroid = (): boolean => {
  if (!window.device) {
    return false;
  }
  const platform: Platform = Parser.parseEnum(window.device.platform, Platform);

  switch (platform) {
    case Platform.android:
    case Platform.mobile:
    case Platform.phablet:
    case Platform.tablet:
      return true;
    default:
      return false;
  }
};
