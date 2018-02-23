import * as React from 'react';
import m, { Comp } from 'mishmash';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default m().style(['rows', 'style.lineHeight'], (rows, lineHeight) => [
  [
    'merge',
    {
      visibility: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      minHeight: parseFloat(lineHeight) * (rows || 1),
      display: 'block',
      overflow: 'hidden',
    },
  ],
])(({ value, rows, style }) => (
  <span style={style}>{`${value || ''}${rows ? '\n' : ''}.`}</span>
)) as Comp<AutosizeProps>;
