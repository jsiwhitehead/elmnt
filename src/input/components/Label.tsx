import * as React from 'react';
import { branch, compose } from 'recompose';
import { mapStyle } from 'highstyle';

import Div from '../../div';
import Txt from '../../txt';
import { cssGroups, focusOnMouseDown } from '../../utils';

import Icon from './Icon';

export default compose<any, any>(

  branch(
    ({ onTextChange }) => onTextChange,
    focusOnMouseDown,
  ),

  mapStyle(({ isFocused }) => [
    ['mergeKeys', { active: isFocused }],
    ['numeric', 'fontSize', 'iconSize', 'paddingLeft', 'paddingRight'],
  ]),
  mapStyle(({ onTextChange, icon, style: { fontSize, iconSize, paddingLeft, paddingRight } }) => ({
    div: [
      ['filter', ...cssGroups.box, ...cssGroups.other],
      ['merge', {
        layout: 'bar', spacing: 0, width: '100%',
        cursor: onTextChange ? 'text' : 'pointer',
        childWidths: icon &&
          icon.side === 'left' ? iconSize + paddingLeft : `auto auto ${iconSize + paddingRight}`,
      }],
    ],
    icon: [
      ['filter', 'color'],
      ['merge', {
        fontSize: iconSize,
        paddingTop: Math.round((fontSize - iconSize) * 0.5),
        paddingBottom: Math.round((fontSize - iconSize) * 0.5),
        paddingRight: icon && icon.side === 'left' && paddingLeft,
        paddingLeft: icon && icon.side === 'right' && paddingRight,
      }],
    ],
    text: [
      ['filter', ...cssGroups.text],
    ],
  })),

)(({ text, icon, onTextChange, onMouseDown, hoverProps, focusProps, setFocusElem, style }) =>
  <Div onMouseDown={onMouseDown} {...hoverProps} style={style.div}>
    {icon && icon.side === 'left' && <Icon type={icon.type} style={style.icon} />}
    <Txt
      onTextChange={onTextChange} {...focusProps} style={style.text} focusRef={setFocusElem}
    >
      {text}
    </Txt>
    {icon && icon.side === 'right' && <Icon type={icon.type} style={style.icon} />}
  </Div>
);
