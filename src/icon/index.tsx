import * as React from 'react';

export interface IconProps {
  path?: string;
  viewBox?: string;
  style?: React.CSSProperties;
}
export default function Icon({ path, viewBox, style }: IconProps) {
  const size = (style && (style.width || style.fontSize)) || 16;
  if (!path) {
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
      viewBox={viewBox}
      className="e5 e6 e7 e8 e9"
    >
      <path style={{ fill: (style && style.color) || 'black' }} d={path} />
    </svg>
  );
}
