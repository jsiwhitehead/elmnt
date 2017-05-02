import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';
import { clickFocus, cssGroups, renderLayer, renderPortal } from '../../utils';

import createItem from './Item';
import ScrollWrapper from './ScrollWrapper';
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

    mapStyle({
      base: null,
      group: [
        ['mergeKeys', 'group'],
        ['merge', { userSelect: 'none' }],
      ],
      key: [
        ['mergeKeys', 'key'],
      ],
    }),

    withProps(({
      text, isList, selectIndex, options, labels, labelIndices, selected,
      activeIndex, moveActiveIndex, style,
    }) => ({
      children: [
        ...(style.base.layout === 'table' ? [<Key text={text} style={style.key} key={-1} />] : []),
        ...labels.map((l, i) => isGroup(l) ?
          <Group style={style.group} key={i}>{l.substring(1)}</Group> :
          <Item
            text={l} isList={isList} index={labelIndices[i]} selectIndex={selectIndex}
            selected={selected} isActive={activeIndex === labelIndices[i]}
            moveActiveIndex={moveActiveIndex} style={style.base} key={i}
          />
        ),
      ],
    })),

    mapStyle(['style.base.layout'], (layout) => ({
      base: {
        div: [
          ['filter', ...cssGroups.other],
          (layout === 'table') && ['mergeKeys', 'row'],
          ['merge', { outline: 'none' }],
        ],
      },
    })),

    branch(
      ({ style }) => style.base.layout === 'table',
      renderComponent(({ onKeyDown, hoverProps, focusProps, setFocusElem, style, children }) =>
        <tr
          onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
          style={style.div} children={children}
        />
      ),
    ),

    renderLayer(({ onKeyDown, hoverProps, focusProps, setFocusElem, style, children }) =>
      <div
        onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
        style={style.div} children={children}
      />
    ),

    branch(
      ({ style }) => style.base.layout !== 'modal',
      renderComponent(({ labels, style, children }) =>
        <Select labels={labels} style={style.base}>{children}</Select>
      ),
    ),

    clickFocus,

    renderPortal(({
      openState, closeModal, onMouseDown, hoverProps, setScrollElem, style, children,
    }) =>
      openState.isOpen && (
        <ScrollWrapper style={style.base} ref={setScrollElem}>
          <Modal
            closeModal={closeModal} modalProps={{ 'data-modal': true, onMouseDown, ...hoverProps }}
            style={style.base} children={children}
          />
        </ScrollWrapper>
      )
    ),

    mapStyle(['isFocused'], (isFocused) => ({
      base: {
        label: [
          ['mergeKeys', { active: isFocused }],
        ],
      },
    })),

  )(({ isList, labelText, openModal, setPortalBaseElem, style }) =>
    <div onMouseDown={openModal} ref={setPortalBaseElem}>
      <Label text={labelText} icon={['', isList ? 'updown' : 'down']} style={style.label} />
    </div>
  );
}
