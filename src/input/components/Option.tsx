import * as React from 'react';
import { compose, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups } from '../../utils';

import Marker from './Marker';

export default compose<any, any>(

  withProps(({ isList, isSelected, style: { layout } }) => ({
    icon: isSelected && (isList || (layout === 'modal') ? 'tick' : 'disc')
  })),

  mapStyle(['isList'], (isList) => [
    !isList && ['merge', { borderRadius: 1000 }],
    ['scale', { fontSize: { iconSize: 0.9 } }],
  ]),

  mapStyle(['style.layout'], (layout) => ({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', {
        cursor: 'pointer', userSelect: 'none', border: 0, borderRadius: 0, boxShadow: 0,
        ...((layout !== 'modal' && layout !== 'table') ? { background: 'none', padding: 0 } : {}),
        ...((layout === 'modal') ? { width: '100%' } : {}),
        ...((layout === 'table') ? { background: 'none' } : {}),
      }],
    ],
    bar: [
      ['scale', { fontSize: { spacing: 0.5 }, iconSize: { childWidths: 1 } }],
      ['filter', 'spacing', 'childWidths'],
      ['merge', { layout: 'bar' }],
    ],
    icon: [
      ['scale', { iconSize: { fontSize: 1 } }],
      layout !== 'modal' && ['scale', { padding: 0.2 }],
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
  <div style={style.div}>
    <Div style={style.bar}>
      <Marker type={icon} style={style.icon} />
      <Txt style={style.text}>{text}</Txt>
    </Div>
  </div>
);
