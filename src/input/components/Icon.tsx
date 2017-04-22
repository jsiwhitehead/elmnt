import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import { cssGroups } from '../../utils';

const stringToColour = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export default compose<any, any>(

  mapStyle(({ type, style: { fontSize } }) => ({ // color = 'black',
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', { display: 'block' }],
    ],
    icon: [
      ['filter', 'color'],
      ['merge', {
        width: fontSize, height: fontSize,
        background: type ? stringToColour(type) : 'transparent',
        borderRadius: fontSize,
      }],
    ],
  })),

)(({ style }) =>
  <div style={style.div}>
    <div style={style.icon} />
  </div>
);
