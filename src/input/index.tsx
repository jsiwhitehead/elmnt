import { branch, compose, pure, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';
import { focusable, memoizeProps, withFocus, withHover } from 'mishmash';

import components from './components';
import createText from './text';
import createSelect from './select';
import { InputProps } from './typings';

export default compose<any, InputProps>(

  focusable,

  memoizeProps('options', 'labels'),

  pure,

  withFocus,
  withHover,

  withProps(({ type }) => ({
    isList: type.endsWith('list'),
  })),

  mapStyle(['invalid', 'isFocused', 'isHovered'], (invalid, isFocused, isHovered) => [
    ['defaults', {
      fontSize: 20, lineHeight: 1.5, color: 'black', layout: 'grid', background: 'white',
    }],
    ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
  ]),

  branch(
    ({ options }) => options,
    renderComponent(createSelect(components)),
  ),

)(createText(components));
