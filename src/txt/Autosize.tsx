import * as React from 'react';
import m, { Comp } from 'mishmash';
import st from 'style-transform';

export interface AutosizeStyle extends React.CSSProperties {
  lineHeight: string;
}
export interface AutosizeProps {
  value: string;
  rows?: number;
  style: AutosizeStyle;
}
export default m.merge('style', 'rows', (style, rows) => ({
  style: st(style).merge({
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    minHeight: parseFloat(style.lineHeight) * (rows || 1),
    display: 'block',
    overflow: 'hidden',
  }),
}))(({ value, rows, style }) => (
  <span style={style}>{`${value || ''}${rows ? '\n' : ''}.`}</span>
)) as Comp<AutosizeProps>;
