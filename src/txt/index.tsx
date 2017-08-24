import * as React from 'react';
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  pure,
  renderComponent,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { CSSTree, mapStyle } from 'mishmash';
import {
  cssGroups,
  focusable,
  focusOnMouse,
  omitProps,
  renderLayer,
} from 'mishmash';

import Autosize from './Autosize';
import Placeholder from './Placeholder';
import cssTransforms from './cssTransforms';

const getMargin = style => {
  const gap = (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) * 0.5;
  return `-${gap + 1}px 0px -${gap + 1}px`;
};

export interface TxtProps extends React.HTMLProps<{}> {
  children?: any;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  rows?: number;
  password?: boolean;
  tab?: number;
  focusRef?: (c: any) => void;
  style?: CSSTree<'placeholder'>;
}
export default compose<any, TxtProps>(
  focusable,
  pure,
  branch(({ onTextChange }) => onTextChange, focusOnMouse as any),
  withProps(({ children, onTextChange }) => ({
    children:
      children === null || children === undefined ? null : children.toString(),
    isInput: !!onTextChange,
  })),
  mapStyle(
    ['isInput'],
    isInput => [
      [
        'defaults',
        {
          fontSize: 16,
          lineHeight: 1.5,
          cursor: isInput ? 'text' : undefined,
        },
      ],
      ['block'],
      ['lineHeightPx'],
    ],
    cssTransforms,
  ),
  renderLayer(
    compose(
      mapStyle(['style.fontSize'], fontSize => ({
        outer: [
          ['filterKeys'],
          ['filter', ...cssGroups.box, ...cssGroups.other],
        ],
        inner: [{ padding: '1px 0px', display: 'block', minHeight: fontSize }],
      })),
      omitProps(
        'isInput',
        'onTextChange',
        'placeholder',
        'rows',
        'password',
        'tab',
        'tabIndex',
        'onFocus',
        'onBlur',
        'focusElem',
        'setFocusElem',
        'focusRef',
        'spellCheck',
      ),
    )(({ style, ...props }: any) =>
      <span
        style={style.outer}
        {...props}
        className={`${props.className || ''} e5 e6 e7 e8 e9`}
      >
        <span style={style.inner}>
          {props.children}
        </span>
      </span>,
    ),
  ),
  mapStyle({
    text: [['filterKeys'], ['filter', ...cssGroups.text]],
    placeholder: [['mergeKeys', 'placeholder'], ['filter', ...cssGroups.text]],
  }),
  branch(
    ({ onTextChange }) => !onTextChange,
    compose(
      mapProps(({ children, placeholder, style }) => ({
        children: children || placeholder,
        style: children ? style.text : style.placeholder,
      })),
      renderComponent(({ children, style }: any) =>
        <span style={{ ...style, display: 'block', margin: getMargin(style) }}>
          {(children || '')
            .split('\n')
            .reduce(
              (res, line, i) =>
                res.concat(i === 0 ? line : [<br key={i} />, line]),
              [],
            )}
        </span>,
      ),
    ),
  ),
  mapStyle({
    text: {
      input: [
        [
          'merge',
          {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            resize: 'none',
            overflow: 'hidden',
            background: 'transparent',
            outline: 'none',
            border: 0,
            padding: 0,
            margin: 0,
            display: 'block',
          },
        ],
      ],
    },
  }),
  withState('cursor', 'setCursor', null),
  lifecycle({
    componentDidUpdate(prevProps: any) {
      const { children, cursor, setCursor, focusElem } = this.props;
      if (children !== prevProps.children && cursor !== null) {
        setCursor(
          null,
          () => (focusElem.selectionStart = focusElem.selectionEnd = cursor),
        );
      }
    },
  }),
  withHandlers({
    onChange: ({ onTextChange }) => event => onTextChange(event.target.value),
    onKeyDown: ({ children, onTextChange, rows, tab, setCursor }) => event => {
      if (event.keyCode === 13 && rows) event.stopPropagation();
      if (event.keyCode === 9 && tab) {
        const start = event.target.selectionStart || 0;
        const end = event.target.selectionEnd || event.target.selectionStart;
        const tabSpaces = Array(tab + 1).join(' ');
        setCursor(start + tab);
        onTextChange(
          `${(children || '').substring(0, start)}${tabSpaces}${(children || '')
            .substring(end)}`,
        );
        event.preventDefault();
      }
    },
  }),
  withProps(
    ({
      children,
      rows,
      password,
      onChange,
      onKeyDown,
      tabIndex = 0,
      onFocus,
      onBlur,
      setFocusElem,
      spellCheck,
      style,
    }) => ({
      value: rows ? children || '' : (children || '').replace(/\n/g, ''),
      inputProps: {
        value: rows ? children || '' : (children || '').replace(/\n/g, ''),
        onChange,
        type: password ? 'password' : 'text',
        onKeyDown,
        tabIndex,
        onFocus,
        onBlur,
        ref: setFocusElem,
        spellCheck,
        size: 1,
        style: style.input,
      },
    }),
  ),
)(({ placeholder, rows, style, value, inputProps }) =>
  <span
    style={{
      position: 'relative',
      display: 'block',
      margin: getMargin(style.text),
    }}
  >
    <Autosize value={value || placeholder} rows={rows} style={style.text} />
    <Placeholder text={placeholder} value={value} style={style.placeholder} />
    {rows ? <textarea {...inputProps} /> : <input {...inputProps} />}
  </span>,
) as React.ComponentClass<any>;
