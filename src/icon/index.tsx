import * as React from 'react';

import icons from './icons';

export interface IconProps {
  type: string;
  style?: React.CSSProperties;
}
export default function Icon({ type, style }: IconProps) {
  const size = (style && (style.width || style.fontSize)) || 16;
  if (!icons[type]) {
    return (
      <span
        style={{ display: 'block', width: size, height: size }}
        className="e5 e6 e7 e8 e9"
      />
    );
  }
  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'block' }}
      viewBox={icons[type].viewBox}
      className="e5 e6 e7 e8 e9"
    >
      <path
        style={{ fill: (style && style.color) || 'black' }}
        d={icons[type].path}
      />
    </svg>
  );
}
