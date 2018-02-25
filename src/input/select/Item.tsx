import * as React from 'react';
import m, { restyle } from 'mishmash';

import Option from '../components/Option';

export default m
  .pure()
  .map(({ selectIndex, moveActiveIndex, ...props }) => ({
    ...props,
    ...(props.style.layout === 'modal'
      ? {
          onMouseUp: () => selectIndex(props.index),
          onMouseMove: () => moveActiveIndex(props.index, true),
        }
      : {
          onMouseDown: () => selectIndex(props.index),
        }),
  }))
  .map(
    restyle(
      ['isActive', 'isSelected', 'style.layout', 'isNone'],
      (isActive, isSelected, layout, isNone) => [
        ['merge', { display: 'block' }],
        [
          'mergeKeys',
          {
            active: isActive,
            selected: isSelected && layout === 'modal',
            none: isNone,
          },
        ],
      ],
    ),
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
