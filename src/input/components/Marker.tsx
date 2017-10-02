import * as React from 'react';
import { compose } from 'recompose';
import { cssGroups, mapStyle } from 'mishmash';

import Icon from '../../icon';

// https://octicons.github.com/
const icons = {
  tick: {
    path: 'M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z',
    viewBox: '0 0 12 16',
  },
  cross: {
    path:
      'M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z',
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
    viewBox: '0 0 12 16',
  },
  disc: {
    path: 'M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z',
    viewBox: '0 0 8 16',
  },
  lock: {
    path:
      'M4 13H3v-1h1v1zm8-6v7c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h1V4c0-2.2 1.8-4 4-4s4 1.8 4 4v2h1c.55 0 1 .45 1 1zM3.8 6h4.41V4c0-1.22-.98-2.2-2.2-2.2-1.22 0-2.2.98-2.2 2.2v2H3.8zM11 7H2v7h9V7zM4 8H3v1h1V8zm0 2H3v1h1v-1z',
    viewBox: '0 0 12 16',
  },
  file: {
    path:
      'M6 5h2v2H6V5zm6-.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v11l3-5 2 4 2-2 3 3V5z',
    viewBox: '0 0 12 16',
  },
  'file-txt': {
    path:
      'M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z',
    viewBox: '0 0 12 16',
  },
  'file-pdf': {
    path:
      'M8.5 1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4.5L8.5 1zM1 2h4a.68.68 0 0 0-.31.2 1.08 1.08 0 0 0-.23.47 4.22 4.22 0 0 0-.09 1.47c.06.609.173 1.211.34 1.8A21.78 21.78 0 0 1 3.6 8.6c-.5 1-.8 1.66-.91 1.84a7.16 7.16 0 0 0-.69.3 4.19 4.19 0 0 0-1 .64V2zm4.42 4.8a5.65 5.65 0 0 0 1.17 2.09c.275.237.595.417.94.53-.64.09-1.23.2-1.81.33a12.22 12.22 0 0 0-1.81.59c-.587.243.22-.44.61-1.25.365-.74.67-1.51.91-2.3l-.01.01zM11 14H1.5a.74.74 0 0 1-.17 0 2.12 2.12 0 0 0 .73-.44 10.14 10.14 0 0 0 1.78-2.38c.31-.13.58-.23.81-.31l.42-.14c.45-.13.94-.23 1.44-.33s1-.16 1.48-.2a8.65 8.65 0 0 0 1.39.53c.403.11.814.188 1.23.23h.38V14H11zm0-4.86a3.74 3.74 0 0 0-.64-.28 4.22 4.22 0 0 0-.75-.11c-.411.003-.822.03-1.23.08a3 3 0 0 1-1-.64 6.07 6.07 0 0 1-1.29-2.33c.111-.661.178-1.33.2-2 .02-.25.02-.5 0-.75a1.05 1.05 0 0 0-.2-.88.82.82 0 0 0-.61-.23H8l3 3v4.14z',
    viewBox: '0 0 12 16',
  },
};

export default compose<any, any>(
  mapStyle([
    ['numeric', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  ]),
  mapStyle({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      [
        'merge',
        {
          display: 'block',
          position: 'relative',
        },
      ],
    ],
    icon: [['filter', 'fontSize', 'color']],
  }),
)(({ type, style }) => (
  <div style={style.div}>
    <Icon {...icons[type]} style={style.icon} />
    <div
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    />
  </div>
));
