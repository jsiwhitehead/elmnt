import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'mishmash';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default compose<any, AutosizeProps>(
  mapStyle(['rows', 'style.lineHeight'], (rows, lineHeight) => [
    [
      'merge',
      {
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: parseFloat(lineHeight) * (rows || 1),
        maxHeight: rows ? 'none' : parseFloat(lineHeight),
        display: 'block',
        overflow: 'hidden',
      },
    ],
  ]),
)(({ value, style }) => (
  <span style={style}>{(value || '').replace(/\n$/, '\n.')}</span>
)) as React.ComponentClass<any>;
