import * as React from 'react';
import { branch, compose, pure, withHandlers } from 'recompose';
import { mapStyle } from 'mishmash';

import Option from '../components/Option';

export default compose<any, any>(
  pure,
  branch(
    ({ style }: any) => style.layout === 'modal',
    withHandlers({
      onMouseUp: ({ index, selectIndex }) => () => selectIndex(index),
      onMouseMove: ({ index, moveActiveIndex }) => () =>
        moveActiveIndex(index, true),
    }),
    withHandlers({
      onMouseDown: ({ index, selectIndex }) => () => selectIndex(index),
    }),
  ),
  mapStyle(
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
