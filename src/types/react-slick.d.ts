declare module 'react-slick' {
  import * as React from 'react';

  export interface Settings {
    [key: string]: any;
  }

  export default class Slider extends React.Component<Settings> {
    slickGoTo(index: number): void;
  }

}
