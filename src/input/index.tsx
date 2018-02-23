import * as React from 'react';

(x => x) as React.ReactNode;

import m, { Comp, focusable, memoize, watchFocus, watchHover } from 'mishmash';

import file from './file';
import select from './select';
import text from './text';
import { InputProps } from './typings';

export default m()
  .merge(focusable)
  .map(({ options, labels, ...props }) => ({
    ...(options ? { options: memoize(options) } : {}),
    ...(labels ? { labels: memoize(labels) } : {}),
    ...props,
  }))
  .pure()
  .enhance(watchFocus)
  .enhance(watchHover)
  .map(({ value, ...props }) => ({
    ...props,
    value:
      value === undefined ||
      (props.type.endsWith('list') &&
        Array.isArray(value) &&
        value.length === 0)
        ? null
        : value,
    isList: props.type.endsWith('list'),
    ...(props.type === 'boolean' && !props.options
      ? { options: { on: true } }
      : {}),
  }))
  .style(
    ['invalid', 'isFocused', 'isHovered'],
    (invalid, isFocused, isHovered) => [
      [
        'defaults',
        { fontSize: 16, lineHeight: 1.5, color: 'black', layout: 'grid' },
      ],
      ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
    ],
  )
  .branch(({ options }) => options, m().render(select))
  .branch(({ type }) => type === 'file', m().render(file))(text) as Comp<
  InputProps
>;
