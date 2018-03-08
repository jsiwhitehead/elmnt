import * as React from 'react';
import m, { Comp, focusable, watchFocus, watchHover } from 'mishmash';
import st from 'style-transform';

import file from './file';
import select from './select';
import text from './text';
import { InputProps } from './typings';

export default m
  .do(focusable('setFocusElem', 'onMouseDown'))
  .pure(true)
  .do(watchFocus)
  .do(watchHover)
  .merge('value', 'type', 'options', (value, type, options) => ({
    value:
      value === undefined ||
      (type.endsWith('list') && Array.isArray(value) && value.length === 0)
        ? null
        : value,
    isList: type.endsWith('list'),
    ...(type === 'boolean' && !options ? { options: { on: true } } : {}),
  }))
  .merge(
    'style',
    'invalid',
    'isFocused',
    'isHovered',
    (style, invalid, isFocused, isHovered) => ({
      style: st(style)
        .defaults({
          fontSize: 16,
          lineHeight: 1.5,
          color: 'black',
          layout: 'grid',
        })
        .mergeKeys({ invalid, focus: isFocused, hover: isHovered }),
    }),
  )(props =>
  React.createElement(
    props.options ? select : props.type === 'file' ? file : text,
    props,
  ),
) as Comp<InputProps>;
