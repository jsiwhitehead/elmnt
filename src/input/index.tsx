import * as React from 'react';
import r from 'refluent';

import { focusable, restyle, watchFocus, watchHover } from '../utils';

import file from './file';
import select from './select';
import text from './text';
import { InputProps } from './typings';

export default focusable('setFocusElem', 'onMouseDown')(
  r
    .label('Input')
    .do(watchFocus)
    .do(watchHover)
    .do('value', 'type', 'options', (value, type, options) => ({
      value:
        value === undefined ||
        (type.endsWith('list') && Array.isArray(value) && value.length === 0)
          ? null
          : value,
      isList: type.endsWith('list'),
      ...(type === 'boolean' && !options ? { options: { on: true } } : {}),
    }))
    .do(
      restyle(
        'invalid',
        'isFocused',
        'isHovered',
        (invalid, isFocused, isHovered, style) =>
          style
            .defaults({
              fontSize: 16,
              lineHeight: 1.5,
              color: 'black',
              layout: 'grid',
            })
            .mergeKeys({ invalid, focus: isFocused, hover: isHovered }),
      ),
    )
    .yield(props =>
      React.createElement(
        props.options ? select : props.type === 'file' ? file : text,
        props,
      ),
    ),
) as React.ComponentClass<InputProps>;
