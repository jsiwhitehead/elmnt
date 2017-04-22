import { ComponentEnhancer, compose, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { focusable, withFocus, withHover } from '../../utils';

export default compose(

  focusable,

  mapStyle(),

  withFocus,
  withHover,

  withProps(({ type }) => ({
    isList: type.endsWith('List'),
  })),

  mapStyle(({ invalid, isFocused, isHovered, style: { fontSize } }) => [

    ['defaults', {
      fontSize: 20, lineHeight: 1.5, color: 'black',
      iconSize: Math.round(parseFloat(fontSize || 20) * 0.5),
    }],

    ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
    ['filterKeys', 'active', 'selected', 'placeholder', 'group', 'key', 'alt'],

  ]),

) as ComponentEnhancer<any, any>;
