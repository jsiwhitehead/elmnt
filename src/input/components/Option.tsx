import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups } from '../../utils';

import { option } from '../logic';

import Icon from './Icon';

export interface OptionStyle extends React.CSSProperties {
  fontSize: number;
  iconSize?: number | string;
}
export interface OptionProps {
  isList: boolean;
  index: number;
  selectIndex: (index: number) => void;
  text?: string;
  icon?: string | false | null;
  modal?: boolean;
  moveActiveIndex?: (move?: number, jumpTo?: boolean) => void;
  style: OptionStyle;
}
export default compose<any, OptionProps>(

  option,

  mapStyle(({ isList, isActive, modal, icon }) => [
    ['mergeKeys', { active: isActive, selected: modal && icon }],
    !isList && ['merge', { borderRadius: 1000 }],
    ['numeric', 'iconSize'],
  ]),

  mapStyle(({ modal }) => ({
    div: [
      ['scale', { fontSize: { spacing: 0.5 }, iconSize: { childWidths: 1 } }],
      ['filter', ...cssGroups.box, ...cssGroups.other, 'childWidths'],
      ['merge', {
        layout: 'bar', cursor: 'pointer', userSelect: 'none', border: 0, borderRadius: 0,
        ...(!modal ? { background: 'none', padding: 0 } : {}),
      }],
    ],
    icon: [
      ['scale', { iconSize: { fontSize: 1 } }],
      ['filter',
        'fontSize', 'color', 'background', ...(!modal ? ['padding', 'border', 'borderRadius'] : []),
      ],
    ],
    text: [
      ['filter', ...cssGroups.text],
    ],
  })),

)(({ text, icon, index, onMouseUp, onMouseDown, onMouseMove, style }) =>
  <Div
    onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
    style={style.div} data-modal-index={index}
  >
    <Icon type={icon} style={style.icon} />
    <Txt style={style.text}>{text}</Txt>
  </Div>
);
