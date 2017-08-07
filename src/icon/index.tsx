import * as React from 'react';

import icons from './icons';

export interface IconProps {
  type: string;
  style?: {
    fontSize?: number | string;
    color?: string;
  };
}
export default function Icon({ type, style }: IconProps) {
  const { fontSize = 20, color = 'black' } = style || {};
  if (!icons[type]) {
    return (
      <span
        style={{ display: 'block', width: fontSize, height: fontSize }}
        className="e1 e2 e3 e4 e5"
      />
    );
  }
  return (
    <svg
      width={fontSize}
      height={fontSize}
      style={{ display: 'block' }}
      viewBox={icons[type].viewBox}
      className="e1 e2 e3 e4 e5"
    >
      <path style={{ fill: color }} d={icons[type].path} />
    </svg>
  );
}
