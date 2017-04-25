import * as React from 'react';
import { branch, compose, pure, withHandlers, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';

export default function createItem({ Option }: Obj<Comp<any>>) {
  return compose<any, any>(

    pure,

    branch(
      ({ style }) => style.layout === 'modal',
      withHandlers({
        onMouseUp: ({ index, selectIndex }) => () => selectIndex(index),
        onMouseMove: ({ index, moveActiveIndex }) => () => moveActiveIndex(index, true),
      }),
      withHandlers({
        onMouseDown: ({ index, selectIndex }) => () => selectIndex(index),
      }),
    ),

    withProps(({ index, isList, selected, style: { layout } }) => ({
      isSelected: isList ? selected[index] : (selected === index),
      Root: layout === 'table' ? 'td' : 'div',
    })),

    mapStyle(['isActive', 'isSelected', 'style.layout'], (isActive, isSelected, layout) => [
      ['mergeKeys', { active: isActive, selected: isSelected && layout === 'modal' }],
    ]),

  )(({
    index, text, isList, isSelected, onMouseUp, onMouseDown, onMouseMove, style, Root,
  }) =>
    <Root
      onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
      data-modal-index={index} style={{ verticalAlign: 'middle' }}
    >
      <Option text={text} isList={isList} isSelected={isSelected} style={style} />
    </Root>
  );
}
