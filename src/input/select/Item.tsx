import * as React from 'react';
import { branch, compose, withHandlers, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';

export default function createItem({ Option }: Obj<Comp<any>>) {
  return compose<any, any>(

    branch(
      ({ layout }) => layout === 'modal',
      withHandlers({
        onMouseUp: ({ index, selectIndex }) => () => selectIndex(index),
        onMouseMove: ({ index, moveActiveIndex }) => () => moveActiveIndex(index, true),
      }),
      withHandlers({
        onMouseDown: ({ index, selectIndex }) => () => selectIndex(index),
      }),
    ),

    withProps(({ index, isList, selected }) => ({
      isSelected: isList ? selected[index] : (selected === index),
    })),

    mapStyle(({ index, activeIndex, isSelected, layout }) => [
      ['mergeKeys', { active: index === activeIndex, selected: isSelected && layout === 'modal' }],
    ]),

  )(({ index, text, isList, isSelected, onMouseUp, onMouseDown, onMouseMove, layout, style }) =>
    <div
      onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}
      data-modal-index={index}
    >
      <Option text={text} isList={isList} isSelected={isSelected} layout={layout} style={style} />
    </div>
  );
}
