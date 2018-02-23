import * as React from 'react';
import m, { focusOnMouse, renderLifted } from 'mishmash';

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

export default m()
  .branch(({ options }) => Array.isArray(options), withSelect, withToggle)
  .style(['style.layout'], layout => ({
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
  }))
  .map(
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
  )
  .style(['style.base.layout'], layout => ({
    base: {
      div: [
        ['filter', ...(layout !== 'modal' ? css.groups.other : [])],
        layout === 'table' && ['mergeKeys', 'row'],
        ['merge', { outline: 'none' }],
      ],
    },
  }))
  .render(
    ({ onKeyDown, hoverProps, focusProps, setFocusElem, style, items, next }) =>
      React.createElement(
        style.base.layout === 'table' ? 'tr' : 'div',
        {
          onKeyDown,
          ...hoverProps,
          ...focusProps,
          ref: setFocusElem,
          style: style.div,
          className: 'e5 e6 e7 e8 e9',
        },
        style.base.layout === 'table' ? items : next(),
      ),
  )
  .branch(
    ({ style }) => style.base.layout !== 'modal',
    m()
      .style({ base: { base: [['filter', 'layout', 'spacing']] } })
      .render(({ items, style }) => <Div style={style.base}>{items}</Div>),
  )
  .enhance(focusOnMouse)
  .merge(
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
  )
  .style(['isFocused'], isFocused => ({
    base: {
      label: [['merge', userSelect], ['mergeKeys', { active: isFocused }]],
    },
  }))(
  ({
    value,
    isList,
    labelText,
    openModal,
    setLiftBaseElem,
    placeholder,
    style,
  }) => (
    <div onMouseDown={openModal}>
      <Label
        text={value && labelText}
        iconRight={isList ? 'updown' : 'down'}
        placeholder={placeholder || labelText}
        setLiftBaseElem={setLiftBaseElem}
        style={style.label}
      />
    </div>
  ),
);
