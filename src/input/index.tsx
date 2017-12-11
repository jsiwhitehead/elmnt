import * as React from 'react';
import { branch, compose, pure, renderComponent, withProps } from 'recompose';
import {
  focusable,
  mapStyle,
  memoizeProps,
  withFocus,
  withHover,
} from 'mishmash';

import components from './components';
import createFile from './file';
import createSelect from './select';
import createText from './text';
import { InputProps } from './typings';

export default compose<any, InputProps>(
  focusable,
  memoizeProps('options', 'labels'),
  pure,
  withFocus,
  withHover,
  withProps(({ value, type, options }: any) => ({
    value:
      value === undefined ||
      (type.endsWith('list') && Array.isArray(value) && value.length === 0)
        ? null
        : value,
    isList: type.endsWith('list'),
    ...type === 'boolean' && !options ? { options: { on: true } } : {},
  })),
  mapStyle(
    ['invalid', 'isFocused', 'isHovered'],
    (invalid, isFocused, isHovered) => [
      [
        'defaults',
        { fontSize: 16, lineHeight: 1.5, color: 'black', layout: 'grid' },
      ],
      ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
    ],
  ),
  branch(
    ({ options }: any) => options,
    renderComponent(createSelect(components)),
  ),
  branch(
    ({ type }: any) => type === 'file',
    renderComponent(createFile(components)),
  ),
)(createText(components)) as React.ComponentClass<InputProps>;
