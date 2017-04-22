import * as React from 'react';

// https://icomoon.io/app/
// https://octicons.github.com/
const icons = {
  tick: {
    path: 'M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z',
    viewBox: '0 0 12 16',
  },
  cross: {
    path: 'M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z',
    viewBox: '0 0 12 16',
  },
  up: {
    path: 'M12 11L6 5l-6 6z',
    viewBox: '0 0 12 16',
  },
  down: {
    path: 'M0 5l6 6 6-6z',
    viewBox: '0 0 12 16',
  },
  updown: {
    path: 'M12 6L6 1.5l-6 4.5z M0 10l6 4.5 6-4.5z',
    viewBox: '0 0 16 16',
  },
  disc: {
    path: 'M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z',
    viewBox: '0 0 8 16',
  },
  search: {
    path: 'M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z',
    viewBox: '0 0 16 16',
  },
  lock: {
    path: 'M4 13H3v-1h1v1zm8-6v7c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h1V4c0-2.2 1.8-4 4-4s4 1.8 4 4v2h1c.55 0 1 .45 1 1zM3.8 6h4.41V4c0-1.22-.98-2.2-2.2-2.2-1.22 0-2.2.98-2.2 2.2v2H3.8zM11 7H2v7h9V7zM4 8H3v1h1V8zm0 2H3v1h1v-1z',
    viewBox: '0 0 12 16',
  },
};

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
