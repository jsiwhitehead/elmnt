import * as React from 'react';
import m, { Comp } from 'mishmash';

export interface IconProps extends React.HTMLProps<{}> {
  path?: string;
  viewBox?: string;
  style?: React.CSSProperties;
}
export default m()
  .map(props => ({
    ...props,
    size: (props.style && (props.style.width || props.style.fontSize)) || 16,
  }))
  .branch(
    ({ path }) => !path,
    m().render(({ viewBox: _a, style, size, next: _b, ...props }) => (
      <span
        style={{ ...style, display: 'block', width: 'auto', height: 'auto' }}
        className="e5 e6 e7 e8 e9"
        {...props}
      >
        <span style={{ display: 'block', width: size, height: size }} />
      </span>
    )),
  )(({ path, viewBox, style, size, ...props }) => (
  <span
    style={{ ...style, display: 'block', width: 'auto', height: 'auto' }}
    className="e5 e6 e7 e8 e9"
    {...props}
  >
    <svg
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size }}
      viewBox={viewBox}
    >
      <path style={{ fill: (style && style.color) || 'black' }} d={path} />
    </svg>
  </span>
)) as Comp<IconProps>;
