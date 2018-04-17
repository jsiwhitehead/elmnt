import * as React from 'react';
import r from 'refluent';

import { restyle } from '../utils';

export interface PlaceholderProps {
  text?: string;
  value: string;
  prompt?: boolean;
  style: React.CSSProperties;
}
export default r
  .yield(
    ({ text, value, prompt, next }) =>
      prompt
        ? next(p => ({
            ...p,
            text: text
              .split('\n')
              .map((l, i) => (value.split('\n')[i] ? '' : l))
              .join('\n'),
          }))
        : text && !value
          ? next()
          : null,
  )
  .do(
    restyle(style =>
      style.merge({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 0,
        display: 'block',
        whiteSpace: 'pre-wrap',
      }),
    ),
  )
  .yield(({ text, style }) => <span style={style}>{text}</span>) as r<
  PlaceholderProps
>;
