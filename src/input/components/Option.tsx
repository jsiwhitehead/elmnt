import * as React from 'react';
import { compose, withProps } from 'recompose';
import { mapStyle } from 'highstyle';
import { cssGroups} from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import Marker from './Marker';

export default compose<any, any>(

  withProps(({ isList, isSelected, style: { layout } }) => ({
    icon: isSelected && (isList || (layout === 'modal') ? 'tick' : 'disc')
  })),

  mapStyle(['isList'], (isList) => [
    !isList && ['merge', { borderRadius: 1000 }],
    ['scale', { iconSize: { fontSize: 0.9 } }],
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
      ['scale', { spacing: { fontSize: 0.5 } }],
      ['filter', 'spacing'],
      ['merge', { layout: 'bar' }],
    ],
    icon: [
      ['scale', { fontSize: { iconSize: 1 }, ...(layout !== 'modal' ? { padding: 0.2 } : {}) }],
      ['scale',
        {
          width: {
            iconSize: 1, paddingLeft: 1, paddingRight: 1, borderLeftWidth: 1, borderRightWidth: 1,
          },
        },
      ],
      ['filter',
        'fontSize', 'color', 'background', 'width',
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
