import * as React from 'react';
import { compose } from 'recompose';
import { cssGroups, Hover, mapStyle } from 'mishmash';

import Div from '../../div';
import Txt from '../../txt';

import Marker from './Marker';

export default compose<any, any>(
  mapStyle([
    ['numeric', 'fontSize'],
    ['scale', { iconSize: { fontSize: 0.9 } }],
  ]),
  mapStyle(
    ['style.fontSize', 'style.iconSize', 'style.cursor'],
    (fontSize, iconSize, cursor) => ({
      div: [
        ['filter', ...cssGroups.box, ...cssGroups.other],
        [
          'merge',
          {
            layout: 'bar',
            spacing: 0,
            width: '100%',
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
      text: [['filter', ...cssGroups.text]],
    }),
  ),
)(
  ({
    text,
    iconLeft,
    iconRight,
    placeholder,
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
  }) =>
    <Div style={style.div}>
      {iconLeft &&
        (onClickLeft
          ? <div onMouseDown={onClickLeft} style={style.iconLeft}>
              <Hover hoverKey="icon" style={style.iconHover}>
                <div>
                  <Marker type={iconLeft} style={style.icon} />
                </div>
              </Hover>
            </div>
          : <div style={style.iconLeft}>
              <Marker type={iconLeft} style={style.icon} />
            </div>)}
      <Txt
        onTextChange={onTextChange}
        {...focusProps}
        focusRef={setFocusElem}
        placeholder={placeholder}
        rows={rows}
        password={password}
        tab={tab}
        spellCheck={spellCheck}
        style={style.text}
        children={text}
      />
      {iconRight &&
        (onClickRight
          ? <div onMouseDown={onClickRight} style={style.iconRight}>
              <Hover hoverKey="icon" style={style.iconHover}>
                <div>
                  <Marker type={iconRight} style={style.icon} />
                </div>
              </Hover>
            </div>
          : <div style={style.iconRight}>
              <Marker type={iconRight} style={style.icon} />
            </div>)}
    </Div>,
) as React.ComponentClass<any>;
