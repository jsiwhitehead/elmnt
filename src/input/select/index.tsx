import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import Modal from '../modal';
import { Comp, Obj } from '../../typings';
import { renderLayer } from '../../utils';

import createItem from './Item';
import createTable from './Table';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default function createSelect({ Group, Key, Label, Option, Select }: Obj<Comp<any>>) {
  const Item = createItem({ Option });
  const Table = createTable({ Key, Item });
  return compose<any, any>(

    withProps(({ style: { layout } }) => ({
      layout,
    })),

    branch(
      ({ options }) => Array.isArray(options),
      withSelect,
      withToggle,
    ),

    branch(
      ({ layout }) => layout === 'table',
      renderComponent(Table),
    ),

    mapStyle(() => ({
      base: null,
      group: [
        ['mergeKeys', 'group'],
      ],
    })),
    renderLayer(({ onKeyDown, hoverProps, focusProps, setFocusElem, children }) =>
      <div
        onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
        style={{ outline: 'none' }} children={children}
      />
    ),
    branch(
      ({ layout }) => layout === 'modal',
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
          isList, labelText, hoverProps, style, children, openState, openModal, closeModal,
          setModalElem,
        }) =>
          <Modal
            isOpen={openState.isOpen} onClickBase={openModal} onClickOutside={closeModal}
            {...hoverProps} style={style.modal} ref={setModalElem}
            baseElement={
              <Label text={labelText} icon={['', isList ? 'updown' : 'down']} style={style.label} />
            }
            children={children}
          />
        ),
      ),
    ),
  )(({
    isList, selectIndex, labelIndices, labels, selected, activeIndex, moveActiveIndex,
    layout, style,
  }) =>
    <Select labels={labels} style={style.base}>
      {labels.map((l, i) => isGroup(l) ?
        <Group style={style.group} key={i}>{l.substring(1)}</Group> :
        <Item
          text={l} isList={isList} index={labelIndices[i]} selectIndex={selectIndex}
          selected={selected} activeIndex={activeIndex} moveActiveIndex={moveActiveIndex}
          layout={layout} style={style.base} key={i}
        />
      )}
    </Select>
  );
}
