import * as React from 'react';
import m, { Comp } from 'mishmash';
import st from 'style-transform';

export interface PlaceholderProps {
  text?: string;
  value: string;
  prompt?: boolean;
  style: React.CSSProperties;
}
export default m
  .do(
    ({ prompt }) => !!prompt,
    ({ text, value }) => !text || !!value,
    (hasPrompt, isHidden) =>
      hasPrompt
        ? m.merge('text', 'value', (text, value) => ({
            text: text
              .split('\n')
              .map((l, i) => (value.split('\n')[i] ? '' : l))
              .join('\n'),
          }))
        : isHidden && m.yield(() => null),
  )
  .merge('style', style => ({
    style: st(style).merge({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: 0,
      display: 'block',
      whiteSpace: 'pre-wrap',
    }),
  }))(({ text, style }) => <span style={style}>{text}</span>) as Comp<
  PlaceholderProps
>;
