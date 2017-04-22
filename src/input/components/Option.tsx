import * as React from 'react';
import { compose, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups } from '../../utils';

import Marker from './Marker';

export default compose<any, any>(

  withProps(({ isList, isSelected, layout }) => ({
    icon: isSelected && (isList || (layout === 'modal') ? 'tick' : 'disc')
  })),

  mapStyle(({ isList, layout }) => [
    !isList && ['merge', { borderRadius: 1000 }],
    ['scale', { fontSize: { iconSize: 0.9 } }],
    layout !== 'modal' && ['scale', { padding: 0.2 }],
  ]),

  mapStyle(({ layout }) => ({
    div: [
      ['scale', { fontSize: { spacing: 0.5 }, iconSize: { childWidths: 1 } }],
      ['filter', ...cssGroups.box, ...cssGroups.other, 'childWidths'],
      ['merge', {
        layout: 'bar', cursor: 'pointer', userSelect: 'none', border: 0, borderRadius: 0,
        ...((layout !== 'modal') ? { background: 'none', padding: 0 } : { width: '100%' }),
      }],
    ],
    icon: [
      ['scale', { iconSize: { fontSize: 1 } }],
      ['filter',
        'fontSize', 'color', 'background',
        ...((layout !== 'modal') ? ['padding', 'border', 'borderRadius'] : []),
      ],
    ],
    text: [
      ['filter', ...cssGroups.text],
    ],
  })),

)(({ text, icon, style }) =>
  <Div style={style.div}>
    <Marker type={icon} style={style.icon} />
    <Txt style={style.text}>{text}</Txt>
  </Div>
);
