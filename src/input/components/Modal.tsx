import * as React from 'react';
import { clickOutside, compose, fitScreen, map, restyle } from 'mishmash';

export default compose(
  clickOutside(props => props.closeModal(), 'setModalElem'),
  fitScreen(({ baseBounds, style }) => ({
    base: baseBounds,
    gap: style.fontSize * 0.25,
  })),
  map(
    restyle(['fitStyle', 'fitSmall'], (fitStyle, fitSmall) => ({
      root: [
        {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999,
        },
      ],
      overlay: [
        {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'rgba(0,0,0,0.5)',
        },
      ],
      outer: [
        ['filter', 'borderRadius'],
        [
          'merge',
          {
            ...fitStyle,
            boxShadow: fitSmall
              ? '0 2px 25px rgba(0,0,0,0.5)'
              : '0 2px 20px 5px rgba(0,0,0,0.4)',
          },
        ],
      ],
      inner: [
        ['scale', { padding: { fontSize: 0.5 } }],
        ['filter', 'background', 'paddingTop', 'paddingBottom'],
      ],
    })),
  ),
)(
  ({
    modalProps,
    style,
    setModalElem,
    setRootElem,
    setInnerElem,
    fitSmall,
    children,
  }) => (
    <div className="e5 e6 e7 e8 e9" style={style.root} ref={setRootElem}>
      {fitSmall && <div style={style.overlay} />}
      <div {...modalProps} style={style.outer} ref={setModalElem}>
        <div style={style.inner} ref={setInnerElem}>
          {children}
        </div>
      </div>
    </div>
  ),
);
