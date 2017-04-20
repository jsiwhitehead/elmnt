import * as React from 'react';
import {
  branch, compose, lifecycle, mapProps, setDisplayName, renderComponent, withHandlers, withProps,
  withState,
} from 'recompose';
import * as omit from 'lodash.omit';
import css, { CSSTree, mapStyle } from 'highstyle';

import { cssGroups, focusable, renderLayer } from '../utils';

import Autosize from './Autosize';
import Placeholder from './Placeholder';
import transforms from './transforms';

const getMargin = style => {
  const gap = (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) * 0.5;
  return `-${Math.floor(gap) + 1}px 0px -${Math.ceil(gap) + 1}px`;
};

export interface TxtProps extends React.HTMLProps<{}> {
  children?: string;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  rows?: number;
  password?: boolean;
  tab?: number;
  style?: CSSTree<"placeholder">;
}
export default compose<any, TxtProps>(

  mapStyle(),

  setDisplayName('Txt'),
  branch(
    ({ onTextChange }) => onTextChange,
    compose(
      focusable,
      withHandlers({
        onMouseDown: ({ onMouseDown, focusElem }) => (event) => {
          if (onMouseDown) onMouseDown(event);
          if (event.target !== focusElem) {
            focusElem.focus();
            event.preventDefault();
          }
        },
      }),
    ),
  ),
  setDisplayName('TxtOuter'),

  mapStyle(({ onTextChange }) => [
    css.defaults({
      fontFamily: 'inherit', fontSize: 20, lineHeight: 1.5,
      cursor: onTextChange ? 'text' : undefined,
    }),
    transforms.block,
    transforms.lineHeightPx,
  ]),

  renderLayer(
    compose(
      mapStyle(({ style }) => ({
        outer: [
          css.filterKeys(),
          css.filter(...cssGroups.box, ...cssGroups.other),
        ],
        inner: [
          { padding: '1px 0px', display: 'block', minHeight: style.fontSize },
        ],
      })),
      mapProps(props => omit(props,
        'onTextChange', 'placeholder', 'rows', 'password', 'tab',
        'tabIndex', 'onFocus', 'onBlur', 'focusElem', 'setFocusElem', 'spellCheck',
      )),
    )(({ style, ...props }: any) => (
      <span style={style.outer} {...props}>
        <span style={style.inner}>{props.children}</span>
      </span>
    )),
  ),

  mapStyle(() => ({
    text: [
      css.filterKeys(),
      css.filter(...cssGroups.text),
    ],
    placeholder: [
      css.mergeKeys('placeholder'),
      css.filter(...cssGroups.text),
    ],
  })),

  branch(
    ({ onTextChange }) => !onTextChange,
    compose(
      mapProps(({ children, placeholder, style }) => ({
        children: children || placeholder,
        style: children ? style.text : style.placeholder,
      })),
      renderComponent(({ children, style }) =>
        <span style={{ ...style, display: 'block', margin: getMargin(style) }}>{children}</span>
      ),
    ),
  ),

  mapStyle(({ rows }) => ({
    text: {
      input: [
        css.merge({
          position: rows ? 'absolute' : 'relative',
          top:0, left:0, width: '100%', height: rows ? '100%' : 'auto',
          resize: 'none', overflow: 'hidden',
          background: 'transparent', outline: 'none',
          border: 0, padding: 0, margin: 0, display: 'block',
        }),
      ],
    }
  })),

  withState('cursor', 'setCursor', null),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { children, cursor, setCursor, focusElem } = this.props;
      if (children !== prevProps.children && cursor !== null) {
        setCursor(null, () => focusElem.selectionStart = focusElem.selectionEnd = cursor);
      }
    },
  }),
  withHandlers({
    onChange: ({ onTextChange }) => (event) => onTextChange(event.target.value),
    onKeyDown: ({ children = '', onTextChange, rows, tab, setCursor }) => (event) => {
      if (event.keyCode === 13 && rows) event.stopPropagation();
      if (event.keyCode === 9 && tab) {
        const start = event.target.selectionStart || 0;
        const end = event.target.selectionEnd || event.target.selectionStart;
        const tabSpaces = Array(tab + 1).join(' ');
        setCursor(start + tab);
        onTextChange(`${children.substring(0, start)}${tabSpaces}${children.substring(end)}`);
        event.preventDefault();
      }
    },
  }),

  withProps(({
    children = '', rows, password, onChange, onKeyDown,
    tabIndex = 0, onFocus, onBlur, setFocusElem, spellCheck, style,
  }) => ({
    value: rows ? children : children.replace(/\n/g, ''),
    inputProps: {
      value: rows ? children : children.replace(/\n/g, ''),
      onChange,
      type: password ? 'password' : 'text',
      onKeyDown,
      tabIndex, onFocus, onBlur,
      ref: setFocusElem,
      spellCheck,
      style: style.input,
    },
  })),

)(({ placeholder, rows, style, value, inputProps }) =>
  <span style={{ position: 'relative', display: 'block', margin: getMargin(style.text) }}>
    <Autosize value={value} rows={rows} style={style.text} />
    <Placeholder text={placeholder} value={value} style={style.placeholder} />
    {rows ? <textarea {...inputProps} /> : <input {...inputProps} />}
  </span>
);
