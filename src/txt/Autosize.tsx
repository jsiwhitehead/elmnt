import * as React from 'react';
import { branch, compose, mapProps, renderNothing, setDisplayName } from 'recompose';
import css, { mapStyle } from 'highstyle';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default compose<any, AutosizeProps>(

  setDisplayName('Autosize'),

  branch(({ rows }) => !rows, renderNothing),

  mapStyle(({ rows, style }) => [
    css.merge({
      visibility: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      minHeight: parseFloat(style.lineHeight) * rows,
      display: 'block',
    }),
  ]),

  mapProps(({ value, style }) => ({
    style,
    children: value.replace(/\n$/, '\n.'),
  })),

)('span' as any);
