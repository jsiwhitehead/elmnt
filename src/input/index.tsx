import {
  branch,
  Comp,
  compose,
  focusable,
  map,
  memoize,
  pure,
  render,
  restyle,
  withFocus,
  withHover,
} from 'mishmash';

import file from './file';
import select from './select';
import text from './text';
import { InputProps } from './typings';

export default compose(
  focusable,
  map(({ options, labels, ...props }) => ({
    ...(options ? { options: memoize(options) } : {}),
    ...(labels ? { labels: memoize(labels) } : {}),
    ...props,
  })),
  pure,
  withFocus,
  withHover,
  map(
    ({ value, ...props }) => ({
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
    }),
    restyle(
      ['invalid', 'isFocused', 'isHovered'],
      (invalid, isFocused, isHovered) => [
        [
          'defaults',
          { fontSize: 16, lineHeight: 1.5, color: 'black', layout: 'grid' },
        ],
        ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
      ],
    ),
  ),
  branch(({ options }) => options, render(select)),
  branch(({ type }) => type === 'file', render(file)),
)(text) as Comp<InputProps>;
