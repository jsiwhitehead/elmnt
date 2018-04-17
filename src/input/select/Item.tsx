import * as React from 'react';
import r from 'refluent';

import { restyle } from '../../utils';

import Option from '../components/Option';

export default r
  .yield(({ next }) => next(props => props))
  .do(
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
  .do(
    restyle(
      'isActive',
      'isSelected',
      'isNone',
      (isActive, isSelected, isNone, style) =>
        style.merge({ display: 'block' }).mergeKeys({
          active: isActive,
          selected: isSelected && style.layout === 'modal',
          none: isNone,
        }),
    ),
  )
  .yield(
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
