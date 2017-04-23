import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import Modal from '../../modal';
import { Comp, Obj } from '../../typings';
import { renderLayer } from '../../utils';

import createItem from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default function createSelect({ Group, Key, Label, Option, Select }: Obj<Comp<any>>) {
  const Item = createItem({ Option });
  return compose<any, any>(

    branch(
      ({ options }) => Array.isArray(options),
      withSelect,
      withToggle,
    ),

    mapStyle(() => ({
      base: null,
      tr: [
        ['filter', 'background'],
        ['merge', { outline: 'none' }],
      ],
      group: [
        ['mergeKeys', 'group'],
      ],
      key: [
        ['mergeKeys', 'key'],
      ],
    })),

    withProps(({
      text, isList, selectIndex, options, labels, labelIndices, selected,
      activeIndex, moveActiveIndex, style,
    }) => ({
      children: [
        ...(text && Array.isArray(options) ? [<Key text={text} style={style.key} key={-1} />] : []),
        ...labels.map((l, i) => isGroup(l) ?
          <Group style={style.group} key={i}>{l.substring(1)}</Group> :
          <Item
            text={l} isList={isList} index={labelIndices[i]} selectIndex={selectIndex}
            selected={selected} activeIndex={activeIndex} moveActiveIndex={moveActiveIndex}
            style={style.base} key={i}
          />
        ),
      ],
    })),

    branch(
      ({ style: { base: { layout } } }) => layout === 'table',
      renderComponent(({ onKeyDown, hoverProps, focusProps, setFocusElem, children, style }) =>
        <tr
          onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
          style={style.tr} children={children}
        />
      ),
      renderLayer(({ onKeyDown, hoverProps, focusProps, setFocusElem, children }) =>
        <div
          onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
          style={{ outline: 'none' }} children={children}
        />
      ),
    ),

    branch(
      ({ style: { base: { layout } } }) => layout === 'modal',
      compose(
        mapStyle(({ isFocused }) => ({ base: {
          modal: [
            ['scale', { fontSize: { padding: 0.5 } }],
            ['filter', 'background', 'paddingTop', 'paddingBottom'],
          ],
          label: [
            ['mergeKeys', { active: isFocused }],
          ]
        } })),
        renderLayer(({
          isList, labelText, hoverProps, openState, openModal, closeModal, setModalElem,
          style, children,
        }) =>
          <Modal
            isOpen={openState.isOpen} onClickBase={openModal} onClickOutside={closeModal}
            {...hoverProps} style={style.modal} ref={setModalElem} children={children}
            baseElement={
              <Label text={labelText} icon={['', isList ? 'updown' : 'down']} style={style.label} />
            }
          />
        ),
      ),
    ),

  )(({ labels, style, children }) =>
    <Select labels={labels} style={style.base}>{children}</Select>
  );
}
