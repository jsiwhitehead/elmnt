import * as React from 'react';
import m, { restyle, watchHover } from 'mishmash';

import css from '../../css';
import Div from '../../div';
import Hover from '../../hover';
import Txt, { TxtInput } from '../../txt';

import Marker from './Marker';

export default m
  .map(
    restyle([
      ['numeric', 'fontSize'],
      ['scale', { iconSize: { fontSize: 1 } }],
    ]),
  )
  .map(
    restyle(
      ['style.fontSize', 'style.iconSize', 'style.display', 'style.cursor'],
      (fontSize, iconSize, display, cursor) => ({
        div: [['filter', ...css.groups.box, ...css.groups.other]],
        bar: [
          {
            layout: 'bar',
            spacing: 0,
            width: display === 'inline-block' ? 'auto' : '100%',
            cursor: cursor || 'pointer',
          },
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
              paddingLeft: { fontSize: 1 },
              width: { iconSize: 1, fontSize: 1 },
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
    setLiftBaseElem,
    style,
  }) => (
    <div style={style.div} ref={setLiftBaseElem}>
      <Div style={style.bar}>
        {iconLeft &&
          (onClickLeft ? (
            <div onMouseDown={onClickLeft} style={style.iconLeft}>
              <Hover style={style.iconHover} styleKey="icon">
                {({ hoverProps, style: divStyle }) => (
                  <div {...hoverProps} style={divStyle}>
                    <Marker type={iconLeft} style={style.icon} />
                  </div>
                )}
              </Hover>
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
              <Hover style={style.iconHover} styleKey="icon">
                {({ hoverProps, style: divStyle }) => (
                  <div {...hoverProps} style={divStyle}>
                    <Marker type={iconRight} style={style.icon} />
                  </div>
                )}
              </Hover>
            </div>
          ) : (
            <div style={style.iconRight}>
              <Marker type={iconRight} style={style.icon} />
            </div>
          ))}
      </Div>
    </div>
  ),
);
