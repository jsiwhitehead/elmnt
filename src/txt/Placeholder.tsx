import * as React from 'react';
import { branch, compose, renderNothing, withProps } from 'recompose';
import { mapStyle } from 'mishmash';

export interface PlaceholderProps {
  text?: string;
  value: string;
  prompt?: boolean;
  style: React.CSSProperties;
}
export default compose<any, PlaceholderProps>(
  branch(
    ({ prompt }) => prompt,
    withProps<any, any>(({ text, value }) => {
      const valueSplit = value.split('\n');
      return {
        text: text
          .split('\n')
          .map((l, i) => (valueSplit[i] ? '' : l))
          .join('\n'),
      };
    }),
    branch(({ text, value }) => !text || value, renderNothing),
  ),
  mapStyle([
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
)(({ text, style }) => <span style={style}>{text}</span>);
