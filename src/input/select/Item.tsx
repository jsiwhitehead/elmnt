import * as React from 'react';
import m from 'mishmash';
import st from 'style-transform';

import Option from '../components/Option';

export default m
  .pure()
  .merge(
    'index',
    'selectIndex',
    'moveActiveIndex',
    'style.layout',
    (index, selectIndex, moveActiveIndex, layout) => ({
      selectIndex: undefined,
      moveActiveIndex: undefined,
      ...(layout === 'modal'
        ? {
            onMouseUp: () => selectIndex(index),
            onMouseMove: () => moveActiveIndex(index, true),
          }
        : {
            onMouseDown: () => selectIndex(index),
          }),
    }),
  )
  .merge(
    'style',
    'isActive',
    'isSelected',
    'style.layout',
    'isNone',
    (style, isActive, isSelected, layout, isNone) => ({
      style: st(style)
        .merge({ display: 'block' })
        .mergeKeys({
          active: isActive,
          selected: isSelected && layout === 'modal',
          none: isNone,
        }),
    }),
  )(
  ({
    index,
    text,
    isList,
    isSelected,
    onMouseUp,
    onMouseDown,
    onMouseMove,
    style,
  }) =>
    React.createElement(
      style.layout === 'table' ? 'td' : 'div',
      {
        onMouseDown,
        onMouseUp,
        onMouseMove,
        'data-modal-index': index,
        style: { verticalAlign: 'middle' },
      },
      <Option
        text={text}
        isList={isList}
        isSelected={isSelected}
        style={style}
      />,
    ),
);
