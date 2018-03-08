import * as React from 'react';
import m from 'mishmash';
import st from 'style-transform';

import css from '../../css';
import Div from '../../div';
import Hover from '../../hover';
import Txt, { TxtInput } from '../../txt';

import Marker from './Marker';

export default m.merge('style', style => {
  const base = st(style)
    .numeric('fontSize')
    .scale({ iconSize: { fontSize: 1 } });
  return {
    style: {
      div: st(base).filter(...css.groups.box, ...css.groups.other),
      bar: {
        layout: 'bar',
        spacing: 0,
        width: base.display === 'inline-block' ? 'auto' : '100%',
        cursor: base.cursor || 'pointer',
      },
      icon: st(base)
        .filter('color')
        .merge({
          fontSize: base.iconSize,
          paddingTop: ((base.fontSize as number) - base.iconSize) * 0.5,
          paddingBottom: ((base.fontSize as number) - base.iconSize) * 0.5,
        }),
      iconHover: st(base)
        .scale({ padding: 0.5, margin: { padding: -0.5 } })
        .filter('padding', 'margin'),
      iconLeft: st(base)
        .scale({
          paddingRight: { fontSize: 0.4 },
          width: { iconSize: 1, fontSize: 0.4 },
        })
        .filter('paddingRight', 'width'),
      iconRight: st(base)
        .scale({
          paddingLeft: { fontSize: 1 },
          width: { iconSize: 1, fontSize: 1 },
        })
        .filter('paddingLeft', 'width'),
      text: st(base).filter(...css.groups.text),
    },
  };
})(
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
    setBaseElem,
    style,
  }) => (
    <div style={style.div} ref={setBaseElem}>
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
            setFocusElem={setFocusElem}
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
