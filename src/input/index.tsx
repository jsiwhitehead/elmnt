import m, { Comp, focusable, restyle, watchFocus, watchHover } from 'mishmash';

import file from './file';
import select from './select';
import text from './text';
import { InputProps } from './typings';

export default m
  .do(focusable('setFocusElem', 'onMouseDown'))
  .cache()
  .pure()
  .do(watchFocus)
  .do(watchHover)
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
  .map(
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
  )
  .branch(({ options }) => options, m.render(select))
  .branch(({ type }) => type === 'file', m.render(file))(text) as Comp<
  InputProps
>;
