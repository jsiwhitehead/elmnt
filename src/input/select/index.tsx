import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import {
  cssGroups,
  focusOnMouse,
  mapStyle,
  renderLayer,
  renderLifted,
} from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import Label from '../components/Label';
import Modal from '../components/Modal';

import Item from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

const userSelect = {
  userSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitUserSelect: 'none',
};

export default compose<any, any>(
  branch(({ options }: any) => Array.isArray(options), withSelect, withToggle),
  mapStyle(['style.layout'], layout => ({
    base: null,
    group: [
      ['mergeKeys', 'group'],
      [
        'filter',
        ...cssGroups.text,
        'paddingTop',
        'paddingBottom',
        ...(layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []),
      ],
      ['merge', { width: '100%', ...userSelect }],
    ],
    keyCell: [
      ['mergeKeys', 'key'],
      ['scale', { paddingRight: { fontSize: 1 } }],
      ['filter', 'padding', 'width'],
      ['merge', { verticalAlign: 'middle' }],
    ],
    keyText: [['mergeKeys', 'key'], ['filter', ...cssGroups.text]],
  })),
  withProps(
    ({
      text,
      isList,
      selectIndex,
      options,
      labels,
      labelIndices,
      selected,
      activeIndex,
      moveActiveIndex,
      style,
    }: any) => ({
      items: [
        ...(style.base.layout === 'table'
          ? [
              <td style={style.keyCell} key={-1}>
                <Txt style={style.keyText}>{text}</Txt>
              </td>,
            ]
          : []),
        ...labels.map(
          (l, i) =>
            isGroup(l) ? (
              <Txt style={style.group} key={i}>
                {l.substring(1)}
              </Txt>
            ) : (
              <Item
                text={l}
                isList={isList}
                index={labelIndices[i]}
                selectIndex={selectIndex}
                isSelected={
                  isList
                    ? selected[labelIndices[i]]
                    : selected === labelIndices[i]
                }
                isActive={activeIndex === labelIndices[i]}
                isNone={Array.isArray(options) && !options[labelIndices[i]]}
                moveActiveIndex={moveActiveIndex}
                style={style.base}
                key={i}
              />
            ),
        ),
      ],
    }),
  ),
  mapStyle(['style.base.layout'], layout => ({
    base: {
      div: [
        ['filter', ...cssGroups.other],
        layout === 'table' && ['mergeKeys', 'row'],
        ['merge', { outline: 'none' }],
      ],
    },
  })),
  branch(
    ({ style }: any) => style.base.layout === 'table',
    renderComponent(
      ({
        onKeyDown,
        hoverProps,
        focusProps,
        setFocusElem,
        style,
        items,
      }: any) => (
        <tr
          onKeyDown={onKeyDown}
          {...hoverProps}
          {...focusProps}
          ref={setFocusElem}
          style={style.div}
          children={items}
          className="e5 e6 e7 e8 e9"
        />
      ),
    ),
  ),
  renderLayer(
    ({ onKeyDown, hoverProps, focusProps, setFocusElem, style, children }) => (
      <div
        onKeyDown={onKeyDown}
        {...hoverProps}
        {...focusProps}
        ref={setFocusElem}
        style={style.div}
        children={children}
        className="e5 e6 e7 e8 e9"
      />
    ),
  ),
  branch(
    ({ style }: any) => style.base.layout !== 'modal',
    compose(
      mapStyle({ base: { base: [['filter', 'layout', 'spacing']] } }),
      renderComponent(({ items, style }: any) => (
        <Div style={style.base}>{items}</Div>
      )),
    ),
  ),
  focusOnMouse,
  renderLifted(
    ({ closeModal, onMouseDown, hoverProps, setScrollElem, style, items }) => (
      <Modal
        closeModal={closeModal}
        modalProps={{ onMouseDown, ...hoverProps, ref: setScrollElem }}
        style={style.base}
        children={items}
      />
    ),
    ({ isOpen }) => isOpen,
  ),
  mapStyle(['isFocused'], isFocused => ({
    base: {
      label: [['merge', userSelect], ['mergeKeys', { active: isFocused }]],
    },
  })),
)(
  ({
    value,
    isList,
    labelText,
    openModal,
    setLiftBaseElem,
    placeholder,
    style,
  }) => (
    <div onMouseDown={openModal} ref={setLiftBaseElem}>
      <Label
        text={value && labelText}
        iconRight={isList ? 'updown' : 'down'}
        placeholder={placeholder || labelText}
        style={style.label}
      />
    </div>
  ),
);
