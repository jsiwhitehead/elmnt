import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Txt from '../../txt';
import { cssGroups } from '../../utils';

import { select } from '../logic';

import Option from './Option';

export interface SelectTableProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  style?: React.CSSProperties;
}
export default compose<any, SelectTableProps>(

  select,

  mapStyle(({ alt }) => ({
    option: [
      ['scale', { padding: 0.7 }],
    ],
    tr: [
      ['filter', 'background'],
      ['mergeKeys', { alt }],
      ['merge', { outline: 'none' }],
    ],
    keyCell: [
      ['scale', { fontSize: { paddingRight: 0.6 } }],
      ['filter', 'padding'],
      ['merge', { verticalAlign: 'middle' }],
    ],
    key: [
      ['mergeKeys', 'key'],
      ['filter', ...cssGroups.text],
    ],
    cell: [
      ['scale', { fontSize: { paddingRight: 1 } }],
      ['filter', 'padding'],
      ['merge', { verticalAlign: 'middle' }],
    ],
  })),

)(({
  isList, selectIndex, labels, label, onMouseDown, onKeyDown, hoverProps, focusProps,
  setFocusElem, style,
}) =>
  <tr
    onMouseDown={onMouseDown} onKeyDown={onKeyDown} {...hoverProps} {...focusProps}
    style={style.tr} ref={setFocusElem}
  >
    <td style={style.keyCell}>
      <Txt style={style.key}>{label}</Txt>
    </td>
    {labels.map((l, i) =>
      <td style={style.cell} key={i}>
        <Option
          isList={isList} index={i} selectIndex={selectIndex} text={l} style={style.option} key={i}
        />
      </td>
    )}
  </tr>
);
