import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Txt from '../../txt';
import { cssGroups, renderLayer } from '../../utils';

import { select } from '../logic';

import Label from './Label';
import Modal from './Modal';
import Option from './Option';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export interface SelectGridProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  style?: React.CSSProperties;
}
export default compose<any, SelectGridProps>(

  select,

  mapStyle(() => [
    ['numeric', 'fontSize', 'iconSize', 'paddingLeft'],
  ]),
  mapStyle(() => ({
    base: null,
    div: [
      ['filter', 'background'],
      ['merge', { outline: 'none' }],
    ],
    modal: [
      ['scale', { fontSize: { padding: 0.5 } }],
      ['filter', 'background', 'paddingTop', 'paddingBottom'],
    ],
    group: [
      ['mergeKeys', 'group'],
      ['filter', ...cssGroups.text, 'padding'],
      ['merge', { userSelect: 'none' }],
    ],
    option: [
      ['merge', { width: '100%' }],
    ],
  })),

  renderLayer(({
    isList, selectIndex, labels, labelIndices, onKeyDown, modal, setModalElem, children,
    hoverProps, focusProps, setFocusElem, style, openState, open, close, moveActiveIndex,
  }) =>
    <div
      onKeyDown={onKeyDown} {...focusProps} style={style.div} ref={setFocusElem}
    >
      <Modal
        isOpen={openState.isOpen} onClickBase={open} onClickOutside={close} {...hoverProps}
        style={style.modal} ref={setModalElem} baseElement={children}
      >
        {labels.map((l, i) => isGroup(l) ?
          <Txt key={l} style={style.group}>{l.substring(1)}</Txt> :
          <Option
            isList={isList} modal={modal} index={labelIndices[i]} selectIndex={selectIndex} text={l}
            moveActiveIndex={moveActiveIndex} style={style.option} key={i}
          />
        )}
      </Modal>
    </div>
  ),

)(({ isFocused, text, hoverProps, style }) =>
  <Label
    text={text} icon={{ side: 'right', type: 'arrow' }}
    hoverProps={hoverProps} style={style.base} isFocused={isFocused}
  />
);
