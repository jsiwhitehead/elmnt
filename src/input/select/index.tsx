import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';
import { clickFocus, renderLayer, renderPortal } from '../../utils';

import createItem from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default function createSelect({ Group, Key, Label, Modal, Option, Select }: Obj<Comp<any>>) {
  const Item = createItem({ Option });
  return compose<any, any>(

    branch(
      ({ options }) => Array.isArray(options),
      withSelect,
      withToggle,
    ),

    mapStyle(() => ({
      base: null,
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
      compose(

        mapStyle(() => ({ base: {
          tr: [
            ['filter', 'background'],
            ['merge', { outline: 'none' }],
          ],
        } })),

        renderComponent(({ onKeyDown, hoverProps, focusProps, setFocusElem, children, style }) =>
          <tr
            onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
            style={style.tr} children={children}
          />
        ),

      ),
    ),

    renderLayer(({ onKeyDown, hoverProps, focusProps, setFocusElem, children }) =>
      <div
        onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
        style={{ outline: 'none' }} children={children}
      />
    ),

    branch(
      ({ style: { base: { layout } } }) => layout !== 'modal',
      renderComponent(({ labels, style, children }) =>
        <Select labels={labels} style={style.base}>{children}</Select>
      ),
    ),

    clickFocus,

    mapStyle(({ isFocused }) => ({ base: {
      overlay: [{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }],
      label: [['mergeKeys', { active: isFocused }]],
    } })),

    renderPortal(({ openState, closeModal, onMouseDown, hoverProps, style, children }) =>
      openState.isOpen && (
        <div onClick={closeModal}>
          <div style={style.overlay} />
          <div onMouseDown={onMouseDown} {...hoverProps}>
            <Modal style={style.base}>{children}</Modal>
          </div>
        </div>
      )
    ),

  )(({ isList, labelText, openModal, setPortalBaseElem, style }) =>
    <div onMouseDown={openModal} ref={setPortalBaseElem}>
      <Label text={labelText} icon={['', isList ? 'updown' : 'down']} style={style.label} />
    </div>
  );
}
