import * as React from 'react';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups} from '../../utils';

import Label from './Label';
import Modal from './Modal';
import Option from './Option';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default {

  Group: mapStyle(['style.layout'], (layout) => [
    ['filter',
      ...cssGroups.text, 'paddingTop', 'paddingBottom',
      ...(layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []),
    ],
  ])(Txt),

  Key: mapStyle({
    cell: [
      ['scale', { fontSize: { paddingRight: 1 } }],
      ['filter', 'padding'],
      ['merge', { verticalAlign: 'middle' }],
    ],
    key: [
      ['filter', ...cssGroups.text],
    ],
  })(({ text, style }) =>
    <td style={style.cell}>
      <Txt style={style.key}>{text}</Txt>
    </td>
  ),

  Label,

  Modal,

  Option,

  Select: mapStyle(['labels', 'style.layout', 'style.spacing'], (labels, layout, spacing) => [{
    layout: layout === 'modal' ? 'stack' : layout,
    childWidths: layout !== 'modal' && labels.map(l => isGroup(l) ? '100%' : 'auto').join(' '),
    spacing: layout === 'modal' ? 0 : spacing,
  }])(({ style, children }) =>
    <Div style={style}>{children}</Div>
  ),

};
