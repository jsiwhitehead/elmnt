import * as React from 'react';
import { branch, compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups } from '../../utils';

import { select, toggle } from '../logic';

import Option from './Option';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export interface SelectGridProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  style?: React.CSSProperties;
}
export default compose<any, SelectGridProps>(

  branch(
    ({ options }) => options, select, toggle,
  ),

  mapStyle(({ labels }) => ({
    option: [
      ['scale', { padding: 0.7 }],
    ],
    div: [
      ['filter', 'background'],
      ['merge', { outline: 'none' }],
    ],
    grid: [
      ['filter', 'spacing'],
      ['merge', {
        layout: 'grid', childWidths: labels.map(l => isGroup(l) ? '100%' : 'auto').join(' '),
      }],
    ],
    group: [
      ['mergeKeys', 'group'],
      ['filter', ...cssGroups.text, 'paddingTop', 'paddingBottom'],
    ],
  })),

)(({
  isList, selectIndex, labels, labelIndices, onMouseDown, onKeyDown,
  hoverProps, focusProps, setFocusElem, style,
}) =>
  <div
    onMouseDown={onMouseDown} onKeyDown={onKeyDown} {...hoverProps} {...focusProps}
    style={style.div} ref={setFocusElem}
  >
    <Div style={style.grid}>
      {labels.map((l, i) => isGroup(l) ?
        <Txt style={style.group} key={i}>{l.substring(1)}</Txt> :
        <Option
          isList={isList} index={labelIndices[i]} selectIndex={selectIndex} text={l}
          style={style.option} key={i}
        />
      )}
    </Div>
  </div>
);
