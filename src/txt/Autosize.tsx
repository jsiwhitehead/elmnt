import * as React from 'react';
import { map, restyle } from 'mishmash';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default map<AutosizeProps>(
  restyle(['rows', 'style.lineHeight'], (rows, lineHeight) => [
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
  ]),
)(({ value, rows, style }) => (
  <span style={style}>{`${value || ''}${rows ? '\n' : ''}.`}</span>
));
