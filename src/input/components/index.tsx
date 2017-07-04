import * as React from 'react';
import { cssGroups, mapStyle } from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import Label from './Label';
import Modal from './Modal';
import Option from './Option';

export default {
  Group: mapStyle(['style.layout'], layout => [
    [
      'filter',
      ...cssGroups.text,
      'paddingTop',
      'paddingBottom',
      ...(layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []),
    ],
  ])(Txt) as React.ComponentClass<any>,

  Key: mapStyle({
    cell: [
      ['scale', { paddingRight: { fontSize: 1 } }],
      ['filter', 'padding', 'width'],
      ['merge', { verticalAlign: 'middle' }],
    ],
    key: [['filter', ...cssGroups.text]],
  })(({ text, style }) =>
    <td style={style.cell}>
      <Txt style={style.key}>
        {text}
      </Txt>
    </td>,
  ) as React.ComponentClass<any>,

  Label: Label as React.ComponentClass<any>,

  Modal: Modal as React.ComponentClass<any>,

  Option: Option as React.ComponentClass<any>,

  Select: mapStyle(['style.layout', 'style.spacing'], (layout, spacing) => [
    {
      layout: layout === 'modal' ? 'stack' : layout,
      spacing: layout === 'modal' ? 0 : spacing,
    },
  ])(({ style, children }) =>
    <Div style={style}>
      {children}
    </Div>,
  ) as React.ComponentClass<any>,
};
