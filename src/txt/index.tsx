import * as React from 'react';
import r from 'refluent';
import { CSSTree } from 'style-transform';

import css from '../css';
import { focusable, restyle } from '../utils';

import Autosize from './Autosize';
import Placeholder from './Placeholder';

const getMargin = style => {
  const gap = (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) * 0.5;
  return `-${gap + 1}px 0px -${gap + 1}px`;
};

export interface TxtProps extends React.HTMLProps<{}> {
  children?: React.ReactNode;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  prompt?: boolean;
  rows?: number;
  password?: boolean;
  setFocusElem?: (c: HTMLElement | null) => void;
  style?: CSSTree<'placeholder'>;
}

const base = (input?) =>
  r
    .label(input ? 'TxtInput' : 'Txt')
    .do(
      restyle(style =>
        style
          .defaults({
            fontSize: 16,
            lineHeight: 1.5,
            cursor: input ? 'text' : undefined,
          })
          .map(s => ({
            ...s,
            display:
              s.display === 'inline' ? 'inline-block' : s.display || 'block',
          }))
          .map(s => {
            if (!s.fontSize || !s.lineHeight) return s;
            const lineHeightNum = !isNaN(s.lineHeight as number)
              ? parseFloat(s.fontSize as string) * (s.lineHeight as number)
              : parseFloat(s.lineHeight as string);
            return { ...s, lineHeight: `${lineHeightNum}px` };
          }),
      ),
    )
    .yield(
      r
        .do(() => ({
          placeholder: undefined,
          ...(input
            ? {
                onTextChange: undefined,
                placeholder: undefined,
                prompt: undefined,
                rows: undefined,
                password: undefined,
                tab: undefined,
                tabIndex: undefined,
                onFocus: undefined,
                onBlur: undefined,
                setFocusElem: undefined,
                spellCheck: undefined,
              }
            : {}),
        }))
        .do(
          restyle(style => ({
            outer: style
              .filterKeys()
              .filter(...css.groups.box, ...css.groups.other),
            inner: {
              padding: '1px 0px',
              display: 'block',
              minHeight: style.fontSize,
            },
          })),
        )
        .yield(({ style, next, ...props }) => (
          <span
            style={style.outer}
            {...props}
            className={`${props.className || ''} e5 e6 e7 e8 e9`}
          >
            <span style={style.inner}>{next()}</span>
          </span>
        )),
    )
    .do(
      restyle(style => ({
        text: style.filterKeys().filter(...css.groups.text),
        placeholder: style.mergeKeys('placeholder').filter(...css.groups.text),
      })),
    );

export default base().yield(
  r
    .do('children', 'placeholder', 'style', (children, placeholder, style) => ({
      children: children || placeholder,
      style: children ? style.text : style.placeholder,
    }))
    .yield(({ style, children }) => (
      <span
        style={{
          ...style,
          display: 'block',
          margin: getMargin(style),
        }}
      >
        {React.Children.toArray(children).reduce<React.ReactNode[]>(
          (result, child, i) =>
            result.concat(
              typeof child === 'string'
                ? child
                    .split('\n')
                    .reduce<React.ReactNode[]>(
                      (res, line, j) =>
                        res.concat(
                          j === 0 ? line : [<br key={`${i}_${j}`} />, line],
                        ),
                      [],
                    )
                : child,
            ),
          [],
        )}
      </span>
    )),
);

export const TxtInput = focusable('setFocusElem', 'onMouseDown')(
  base(true).yield(
    r
      .do(
        restyle(style => ({
          ...style,
          input: style.text.merge({
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
          }),
        })),
      )
      .do('rows', 'children', (rows, children) => {
        const v = (children || '').toString();
        return {
          children: undefined,
          value: rows === undefined ? v.replace(/\n/g, '') : v,
        };
      })
      .do('rows', 'onTextChange', (rows, onTextChange) => ({
        onChange: event => onTextChange((event.target as any).value),
        onKeyDown: event => {
          if (event.keyCode === 13) {
            if (rows === undefined) event.preventDefault();
            else event.stopPropagation();
          }
        },
      }))
      .yield(
        ({
          tabIndex,
          onFocus,
          onBlur,
          setFocusElem,
          spellCheck,
          value,
          placeholder,
          prompt,
          rows,
          password,
          onChange,
          onKeyDown,
          style,
        }) => (
          <span
            style={{
              position: 'relative',
              display: 'block',
              margin: getMargin(style.text),
            }}
          >
            <Autosize
              value={value || placeholder}
              rows={rows}
              style={style.text}
            />
            <Placeholder
              text={placeholder}
              value={value}
              prompt={prompt}
              style={style.placeholder}
            />
            {React.createElement(password ? 'input' : 'textarea', {
              ...(password ? { type: 'password' } : {}),
              value,
              onChange,
              onKeyDown,
              tabIndex,
              onFocus,
              onBlur,
              ref: setFocusElem,
              spellCheck,
              size: 1,
              style: style.input,
            })}
          </span>
        ),
      ),
  ),
);
