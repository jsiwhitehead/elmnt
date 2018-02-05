import * as React from 'react';
import { map, restyle, withHover, Wrap } from 'mishmash';
import st from 'style-transform';

import css from '../../css';
import Div from '../../div';
import Txt, { TxtInput } from '../../txt';

import Marker from './Marker';

export default map(
  restyle([['numeric', 'fontSize'], ['scale', { iconSize: { fontSize: 1 } }]]),
  restyle(
    ['style.fontSize', 'style.iconSize', 'style.display', 'style.cursor'],
    (fontSize, iconSize, display, cursor) => ({
      div: [
        ['filter', ...css.groups.box, ...css.groups.other],
        [
          'merge',
          {
            layout: 'bar',
            spacing: 0,
            width: display === 'inline-block' ? 'auto' : '100%',
            cursor: cursor || 'pointer',
          },
        ],
      ],
      icon: [
        ['filter', 'color'],
        [
          'merge',
          {
            fontSize: iconSize,
            paddingTop: (fontSize - iconSize) * 0.5,
            paddingBottom: (fontSize - iconSize) * 0.5,
          },
        ],
      ],
      iconHover: [
        ['scale', { padding: 0.5, margin: { padding: -0.5 } }],
        ['filter', 'padding', 'margin'],
      ],
      iconLeft: [
        [
          'scale',
          {
            paddingRight: { fontSize: 0.4 },
            width: { iconSize: 1, fontSize: 0.4 },
          },
        ],
        ['filter', 'paddingRight', 'width'],
      ],
      iconRight: [
        [
          'scale',
          {
            paddingLeft: { fontSize: 0.4 },
            width: { iconSize: 1, fontSize: 0.4 },
          },
        ],
        ['filter', 'paddingLeft', 'width'],
      ],
      text: [['filter', ...css.groups.text]],
    }),
  ),
)(
  ({
    text,
    iconLeft,
    iconRight,
    placeholder,
    prompt,
    rows,
    password,
    tab,
    spellCheck,
    onTextChange,
    onClickLeft,
    onClickRight,
    focusProps,
    setFocusElem,
    style,
  }) => (
    <Div style={style.div}>
      {iconLeft &&
        (onClickLeft ? (
          <div onMouseDown={onClickLeft} style={style.iconLeft}>
            <Wrap hoc={withHover}>
              {({ isHovered: icon, hoverProps }) => (
                <div
                  {...hoverProps}
                  style={st(style.iconHover, [['mergeKeys', { icon }]])}
                >
                  <Marker type={iconLeft} style={style.icon} />
                </div>
              )}
            </Wrap>
          </div>
        ) : (
          <div style={style.iconLeft}>
            <Marker type={iconLeft} style={style.icon} />
          </div>
        ))}
      {onTextChange ? (
        <TxtInput
          onTextChange={onTextChange}
          {...focusProps}
          focusRef={setFocusElem}
          placeholder={placeholder}
          prompt={prompt}
          rows={rows}
          password={password}
          tab={tab}
          spellCheck={spellCheck}
          style={style.text}
          children={text}
        />
      ) : (
        <Txt placeholder={placeholder} style={style.text} children={text} />
      )}
      {iconRight &&
        (onClickRight ? (
          <div onMouseDown={onClickRight} style={style.iconRight}>
            <Wrap hoc={withHover}>
              {({ isHovered: icon, hoverProps }) => (
                <div
                  {...hoverProps}
                  style={st(style.iconHover, [['mergeKeys', { icon }]])}
                >
                  <Marker type={iconRight} style={style.icon} />
                </div>
              )}
            </Wrap>
          </div>
        ) : (
          <div style={style.iconRight}>
            <Marker type={iconRight} style={style.icon} />
          </div>
        ))}
    </Div>
  ),
);
