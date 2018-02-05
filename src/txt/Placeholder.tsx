import * as React from 'react';
import { branch, compose, map, render, restyle } from 'mishmash';

export interface PlaceholderProps {
  text?: string;
  value: string;
  prompt?: boolean;
  style: React.CSSProperties;
}
export default compose<PlaceholderProps>(
  branch(
    ({ prompt }) => prompt,
    map(({ text, ...props }) => ({
      ...props,
      text: text
        .split('\n')
        .map((l, i) => (props.value.split('\n')[i] ? '' : l))
        .join('\n'),
    })),
    branch(({ text, value }) => !text || value, render()),
  ),
  map(
    restyle([
      [
        'merge',
        {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: 0,
          display: 'block',
          whiteSpace: 'pre-wrap',
        },
      ],
    ]),
  ),
)(({ text, style }) => <span style={style}>{text}</span>);
