import * as React from 'react';
import { mapStyle } from 'highstyle';

import Label from './Label';
import Option from './Option';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups} from '../../utils';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default {

  Group: mapStyle(() => [
    ['filter', ...cssGroups.text, 'padding'],
  ])(Txt),

  Key: mapStyle(() => [
    ['filter', ...cssGroups.text],
  ])(Txt),

  Label,

  Option,

  Select: mapStyle(({ labels, style: { layout, spacing } }) => [
    ['filter', 'background'],
    ['merge', {
      layout: layout === 'modal' ? 'stack' : layout,
      childWidths: layout !== 'modal' && labels.map(l => isGroup(l) ? '100%' : 'auto').join(' '),
      spacing: layout === 'modal' ? 0 : spacing,
    }],
  ])(({ style, children }) =>
    <Div style={style}>{children}</Div>
  ),

};
