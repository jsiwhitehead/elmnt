import * as React from 'react';

import icons from './icons';

export interface IconProps {
  type: string;
  style: {
    fontSize: number | string;
    color: string;
  }
}
export default function Icon({ type, style: { fontSize = 20, color = 'black' } = {} }: IconProps) {
  if (!icons[type]) {
    return <span style={{ display: 'block', width: fontSize, height: fontSize }} />;
  }
  return (
    <svg
      width={fontSize} height={fontSize} style={{ display: 'block' }}
      viewBox={icons[type].viewBox}
    >
      <path style={{ fill: color }} d={icons[type].path} />
    </svg>
  );
}
