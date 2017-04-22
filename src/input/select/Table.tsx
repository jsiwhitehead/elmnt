import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';

export default function createTable({ Key, Item }: Obj<Comp<any>>) {
  return compose<any, any>(

    mapStyle(() => ({
      base: null,
      tr: [
        ['filter', 'background'],
        ['merge', { outline: 'none' }],
      ],
      keyCell: [
        ['scale', { fontSize: { paddingRight: 1 } }],
        ['filter', 'padding'],
        ['merge', { verticalAlign: 'middle' }],
      ],
      cell: [
        ['scale', { fontSize: { paddingLeft: 1 } }],
        ['filter', 'padding'],
        ['merge', { verticalAlign: 'middle' }],
      ],
      key: [
        ['mergeKeys', 'key'],
      ],
    })),

  )(({
    isList, selectIndex, text, labels, labelIndices, selected, activeIndex,
    onMouseDown, onKeyDown, hoverProps, focusProps, setFocusElem, layout, style,
  }) =>
    <tr
      onMouseDown={onMouseDown} onKeyDown={onKeyDown} {...hoverProps} {...focusProps}
      style={style.tr} ref={setFocusElem}
    >
      <td style={style.keyCell}>
        <Key style={style.key}>{text}</Key>
      </td>
      {labels.map((l, i) =>
        <td style={style.cell} key={i}>
          <Item
            text={l} isList={isList} index={labelIndices[i]} selectIndex={selectIndex}
            selected={selected} activeIndex={activeIndex} layout={layout} style={style.base}
          />
        </td>
      )}
    </tr>
  );
}
