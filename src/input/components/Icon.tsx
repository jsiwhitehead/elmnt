import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import { cssGroups } from '../../utils';

export interface IconProps {
  type?: string | false | null;
  style?: React.CSSProperties;
}
export default compose<any, IconProps>(

  mapStyle(({ type, style: { color = 'black', fontSize } }) => ({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', { display: 'block' }],
    ],
    icon: [
      ['filter', 'color'],
      ['merge', {
        width: fontSize, height: fontSize,
        background: type ? color : 'transparent',
        borderRadius: fontSize,
      }],
    ],
  })),

)(({ style }) =>
  <div style={style.div}>
    <div style={style.icon} />
  </div>
);
