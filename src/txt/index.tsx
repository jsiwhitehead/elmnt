import * as React from 'react';
import m, { focusable } from 'mishmash';
import st, { CSSTree } from 'style-transform';

import css from '../css';

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

const createTxt = (input?: boolean) =>
  m
    .do(input && focusable('setFocusElem', 'onMouseDown'))
    .pure(true)
    .merge('style', style => ({
      style: st(style)
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
    }))
    .yield(
      m.merge('style', style => ({
        style: {
          outer: st(style)
            .filterKeys()
            .filter(...css.groups.box, ...css.groups.other),
          inner: {
            padding: '1px 0px',
            display: 'block',
            minHeight: style.fontSize,
          },
        },
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
      }))(({ style, next, ...props }) => (
        <span
          style={style.outer}
          {...props}
          className={`${props.className || ''} e5 e6 e7 e8 e9`}
        >
          <span style={style.inner}>{next()}</span>
        </span>
      )),
    )
    .merge('style', style => ({
      style: {
        text: st(style)
          .filterKeys()
          .filter(...css.groups.text),
        placeholder: st(style)
          .mergeKeys('placeholder')
          .filter(...css.groups.text),
      },
    }))(
    !input
      ? m.merge(
          'children',
          'placeholder',
          'style',
          (children, placeholder, style) => ({
            children: children || placeholder,
            style: children ? style.text : style.placeholder,
          }),
        )(({ style, children }) => (
          <span
            style={{ ...style, display: 'block', margin: getMargin(style) }}
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
        ))
      : m
          .merge('style', style => ({
            style: {
              ...style,
              input: st(style.text).merge({
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
            },
          }))
          .merge('rows', 'children', (rows, children) => {
            const v = (children || '').toString();
            return {
              children: undefined,
              value: rows === undefined ? v.replace(/\n/g, '') : v,
            };
          })
          .merge('rows', 'onTextChange', (rows, onTextChange) => ({
            onChange: event => onTextChange((event.target as any).value),
            onKeyDown: event => {
              if (event.keyCode === 13) {
                if (rows === undefined) event.preventDefault();
                else event.stopPropagation();
              }
            },
          }))(
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
  );

export default createTxt();
export const TxtInput = createTxt(true);
