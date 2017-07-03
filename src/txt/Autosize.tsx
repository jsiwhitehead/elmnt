import * as React from 'react';
import { branch, compose, renderNothing } from 'recompose';
import { mapStyle } from 'highstyle';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default compose<any, AutosizeProps>(
  branch(({ rows }) => !rows, renderNothing),
  mapStyle(['rows', 'style.lineHeight'], (rows, lineHeight) => [
    [
      'merge',
      {
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: parseFloat(lineHeight) * rows,
        display: 'block',
      },
    ],
  ]),
)(({ value, style }) =>
  <span style={style}>
    {value.replace(/\n$/, '\n.')}
  </span>,
) as React.ComponentClass<any>;
