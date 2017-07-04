import * as React from 'react';
import { branch, compose, pure, withHandlers, withProps } from 'recompose';
import { Comp, mapStyle, Obj } from 'mishmash';

export default function createItem({ Option }: Obj<Comp>) {
  return compose<any, any>(
    pure,
    branch(
      ({ style }) => style.layout === 'modal',
      withHandlers({
        onMouseUp: ({ index, selectIndex }) => () => selectIndex(index),
        onMouseMove: ({ index, moveActiveIndex }) => () =>
          moveActiveIndex(index, true),
      }) as any,
      withHandlers({
        onMouseDown: ({ index, selectIndex }) => () => selectIndex(index),
      }) as any,
    ),
    withProps(({ style: { layout } }) => ({
      Root: layout === 'table' ? 'td' : 'div',
    })),
    mapStyle(
      ['isActive', 'isSelected', 'style.layout', 'isNone'],
      (isActive, isSelected, layout, isNone) => [
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
      Root,
    }) =>
      <Root
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        data-modal-index={index}
        style={{ verticalAlign: 'middle' }}
      >
        <Option
          text={text}
          isList={isList}
          isSelected={isSelected}
          style={style}
        />
      </Root>,
  ) as React.ComponentClass<any>;
}
