import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import { cssGroups } from '../../utils';

import Icon from './Icon';

export default compose<any, any>(

  mapStyle(() => ({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', { display: 'block' }],
    ],
    icon: [
      ['filter', 'fontSize', 'color'],
    ],
  })),

)(({ type, style }) =>
  <div style={style.div}>
    <Icon type={type} style={style.icon} />
  </div>
);
