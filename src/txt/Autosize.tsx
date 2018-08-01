import * as React from 'react';
import r from 'refluent';

import { restyle } from '../utils';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default r
  .do(
    restyle('rows', (rows, style) =>
      style.merge({
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: parseFloat(style.lineHeight) * (rows || 1),
        display: 'block',
        overflow: 'hidden',
      }),
    ),
  )
  .yield(({ value, rows, style }) => (
    <span style={style}>
      {(rows !== -1 && value) || ''}
      {rows && rows !== -1 ? '\n' : ''}.
    </span>
  )) as r<AutosizeProps>;
