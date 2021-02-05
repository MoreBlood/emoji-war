/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare global {
  interface Window {
    plugins: any;
    device: any;
    TapticEngine: any;
    webGa: any;
    ga: {
      trackMetric: (key: number, value: number) => void;
      trackEvent: (
        category: string,
        action: string,
        label?: string,
        value?: number,
        newSession?: boolean,
      ) => void;
      trackView: (view: string) => void;
      startTrackerWithId: (id: string, num?: number) => void;
    };
    admob: any;
  }
}

declare interface FastClickCommonJS {
  (layer: any, options?: FastClickOptions): FastClickObject;
  FastClick: FastClickStatic;
}

declare module 'fastclick' {
  var exports: FastClickCommonJS | FastClickStatic;
  export = exports;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.md' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

export * from '@types/react-router';

export { RouteComponentProps } from 'react-router';

declare module 'react-router-dom' {
  export function withRouter<T extends RouteComponentProps<any>>(
    component?: React.ComponentType<T>,
  ): any;
}
