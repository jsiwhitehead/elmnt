import * as React from 'react';
import { branch, compose, renderNothing } from 'recompose';
import { mapStyle } from 'highstyle';

export interface PlaceholderProps {
  text?: string;
  value: string;
  style: React.CSSProperties;
}
export default compose<any, PlaceholderProps>(

  branch(({ text, value }) => !text || value, renderNothing),

  mapStyle([
    ['merge', {
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      padding: 0,
      display: 'block',
    }],
  ]),

)(({ text, style }) =>
  <span style={style}>{text}</span>
);
