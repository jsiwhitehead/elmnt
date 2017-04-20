import * as React from 'react';
import { branch, compose, mapProps, renderNothing, setDisplayName } from 'recompose';
import css, { mapStyle } from 'highstyle';

export interface PlaceholderProps {
  text?: string;
  value: string;
  style: React.CSSProperties;
}
export default compose<any, PlaceholderProps>(

  setDisplayName('Placeholder'),

  branch(({ text, value }) => !text || value, renderNothing),

  mapStyle(() => [
    css.merge({
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      padding: 0,
      display: 'block',
    }),
  ]),

  mapProps(({ text, style }) => ({
    style,
    children: text,
  })),

)('span' as any);
