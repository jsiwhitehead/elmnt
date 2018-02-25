import * as React from 'react';
import m, { Comp, restyle } from 'mishmash';

export interface PlaceholderProps {
  text?: string;
  value: string;
  prompt?: boolean;
  style: React.CSSProperties;
}
export default m
  .branch(
    ({ prompt }) => prompt,
    m.map(({ text, ...props }) => ({
      ...props,
      text: text
        .split('\n')
        .map((l, i) => (props.value.split('\n')[i] ? '' : l))
        .join('\n'),
    })),
    m.branch(({ text, value }) => !text || value, m.render()),
  )
  .map(
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
  )(({ text, style }) => <span style={style}>{text}</span>) as Comp<
  PlaceholderProps
>;
