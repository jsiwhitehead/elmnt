import * as React from 'react';
import {
  branch,
  compose,
  focusOnMouse,
  map,
  render,
  renderLifted,
  restyle,
} from 'mishmash';

import css from '../../css';
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

export default compose(
  branch(({ options }) => Array.isArray(options), withSelect, withToggle),
  map(
    restyle(['style.layout'], layout => ({
      base: null,
      group: [
        ['mergeKeys', 'group'],
        [
          'filter',
          ...css.groups.text,
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
      keyText: [['mergeKeys', 'key'], ['filter', ...css.groups.text]],
    })),
    ({
      text,
      selectIndex,
      options,
      labels,
      labelIndices,
      selected,
      activeIndex,
      moveActiveIndex,
      ...props
    }) => ({
      ...props,
      items: [
        ...(props.style.base.layout === 'table'
          ? [
              <td style={props.style.keyCell} key={-1}>
                <Txt style={props.style.keyText}>{text}</Txt>
              </td>,
            ]
          : []),
        ...labels.map(
          (l, i) =>
            isGroup(l) ? (
              <Txt style={props.style.group} key={i}>
                {l.substring(1)}
              </Txt>
            ) : (
              <Item
                text={l}
                isList={props.isList}
                index={labelIndices[i]}
                selectIndex={selectIndex}
                isSelected={
                  props.isList
                    ? selected[labelIndices[i]]
                    : selected === labelIndices[i]
                }
                isActive={activeIndex === labelIndices[i]}
                isNone={Array.isArray(options) && !options[labelIndices[i]]}
                moveActiveIndex={moveActiveIndex}
                style={props.style.base}
                key={i}
              />
            ),
        ),
      ],
    }),
    restyle(['style.base.layout'], layout => ({
      base: {
        div: [
          ['filter', ...css.groups.other],
          layout === 'table' && ['mergeKeys', 'row'],
          ['merge', { outline: 'none' }],
        ],
      },
    })),
  ),
  branch(
    ({ style }) => style.base.layout === 'table',
    render(
      ({ onKeyDown, hoverProps, focusProps, setFocusElem, style, items }) => (
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
  render(
    ({ onKeyDown, hoverProps, focusProps, setFocusElem, style, inner }) => (
      <div
        onKeyDown={onKeyDown}
        {...hoverProps}
        {...focusProps}
        ref={setFocusElem}
        style={style.div}
        children={inner()}
        className="e5 e6 e7 e8 e9"
      />
    ),
  ),
  branch(
    ({ style }) => style.base.layout !== 'modal',
    compose(
      map(restyle({ base: { base: [['filter', 'layout', 'spacing']] } })),
      render(({ items, style }) => <Div style={style.base}>{items}</Div>),
    ),
  ),
  focusOnMouse,
  renderLifted(
    ({
      closeModal,
      onMouseDown,
      hoverProps,
      setScrollElem,
      style,
      items,
      liftBounds,
    }) => (
      <Modal
        closeModal={closeModal}
        modalProps={{ onMouseDown, ...hoverProps, ref: setScrollElem }}
        baseBounds={liftBounds}
        style={style.base}
        children={items}
      />
    ),
    ({ isOpen }) => isOpen,
  ),
  map(
    restyle(['isFocused'], isFocused => ({
      base: {
        label: [['merge', userSelect], ['mergeKeys', { active: isFocused }]],
      },
    })),
  ),
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
