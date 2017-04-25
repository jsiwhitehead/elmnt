import * as React from 'react';
import { branch, compose, pure, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { focusable, withFocus, withHover } from '../utils';

import components from './components';
import createText from './text';
import createSelect from './select';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  style?: React.CSSProperties;
}
export default compose<any, InputProps>(

  focusable,

  withFocus,
  withHover,

  pure,

  withProps(({ type }) => ({
    isList: type.endsWith('list'),
  })),

  mapStyle(['invalid', 'isFocused', 'isHovered'], (invalid, isFocused, isHovered) => [
    ['defaults', {
      fontSize: 20, lineHeight: 1.5, color: 'black', layout: 'grid', background: 'white',
    }],
    ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
    ['filterKeys', 'active', 'selected', 'placeholder', 'group', 'key', 'alt'],
  ]),

  branch(
    ({ options }) => options,
    renderComponent(createSelect(components)),
  ),

)(createText(components));
