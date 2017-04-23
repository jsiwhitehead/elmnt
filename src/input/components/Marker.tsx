import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Icon from '../../icon';
import { cssGroups } from '../../utils';

export default compose<any, any>(

  mapStyle(() => ({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', { display: 'block', position: 'relative' }],
    ],
    icon: [
      ['filter', 'fontSize', 'color'],
    ],
  })),

)(({ type, style }) =>
  <div style={style.div}>
    <Icon type={type} style={style.icon} />
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
  </div>
);
