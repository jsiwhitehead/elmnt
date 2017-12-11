import * as React from 'react';
import { branch, compose, pure, withHandlers } from 'recompose';
import { Comp, mapStyle } from 'mishmash';

export default function createItem({ Option }: { [key: string]: Comp }) {
  return compose<any, any>(
    pure,
    branch(
      ({ style }: any) => style.layout === 'modal',
      withHandlers({
        onMouseUp: ({ index, selectIndex }: any) => () => selectIndex(index),
        onMouseMove: ({ index, moveActiveIndex }: any) => () =>
          moveActiveIndex(index, true),
      }),
      withHandlers({
        onMouseDown: ({ index, selectIndex }: any) => () => selectIndex(index),
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
}
