import * as React from 'react';
import * as ReactDOM from 'react-dom';
import r from 'refluent';

import { clickOutsideRef, resizeRef, restyle } from '../utils';

let liftsElem;
if (typeof document !== 'undefined') {
  liftsElem = document.createElement('div');
  document.body.appendChild(liftsElem);
}

let counter = 0;
const indices = {};

export default r
  .transform(C => (C.displayName = 'Modal') && C)
  .yield(({ next }) => next(props => props, true))
  .do((props$, _) => ({
    setClickElem: clickOutsideRef(() => {
      return props$().onClose();
    }),
  }))
  .do((props$, _) => {
    const index = counter++;
    props$('isOpen', isOpen => {
      indices[index] = isOpen;
      document.body.style.overflow = Object.keys(indices).some(k => indices[k])
        ? 'hidden'
        : 'auto';
    });
    return () => delete indices[index];
  })
  .do((props$, push, commit) => {
    const info: any = {};
    const update = newInfo => {
      Object.assign(info, newInfo);
      if (info.screen && info.base) {
        const fitSmall = info.screen.width < 500;
        const { width = 0, height = 0 } = info.inner || {};
        push({
          fitSmall,
          fitStyle: {
            position: 'fixed',
            overflow: 'auto',
            height: Math.min(
              height,
              info.screen.height - (fitSmall ? 30 : info.gap) * 2,
            ),
            visibility: height === 0 ? 'hidden' : 'visible',
            ...(fitSmall || !info.base
              ? {
                  left: 50,
                  width: info.screen.width - 100,
                  top: Math.max(30, (info.screen.height - height) * 0.5),
                }
              : {
                  left: Math.max(
                    info.gap,
                    Math.min(
                      info.base.left || 0,
                      info.screen.width - width - info.gap,
                    ),
                  ),
                  width: info.base.width,
                  top: Math.max(
                    info.gap,
                    Math.min(
                      info.base.top || 0,
                      info.screen.height - height - info.gap,
                    ),
                  ),
                }),
          },
        });
      }
    };
    props$('style.fontSize', fontSize => update({ gap: fontSize * 0.25 }));
    if (commit) {
      push({
        setModalBase: resizeRef(
          size => props$().getBase && update({ base: props$().getBase(size) }),
          true,
        ),
      });
    }
    push({ setInnerElem: resizeRef(size => update({ inner: size })) });
    if (typeof document !== 'undefined') {
      const updateScreen = () =>
        update({
          screen: { width: window.innerWidth, height: window.innerHeight },
        });
      updateScreen();
      window.addEventListener('resize', updateScreen);
      return () => window.removeEventListener('resize', updateScreen);
    }
  })
  .do((props$, push) =>
    props$('isOpen', commit => {
      if (commit) {
        push({ setModalBase: undefined }, () =>
          push({ setModalBase: props$().setModalBase }),
        );
      }
    }),
  )
  .do(
    restyle(
      'style.fontSize',
      'fitStyle',
      'fitSmall',
      (fontSize, fitStyle, fitSmall, style) => ({
        root: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999,
        },
        overlay: {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'rgba(0,0,0,0.5)',
        },
        outer: style.filter('borderRadius').merge({
          ...fitStyle,
          boxShadow: fitSmall
            ? '0 2px 25px rgba(0,0,0,0.5)'
            : '0 2px 20px 5px rgba(0,0,0,0.4)',
        }),
        inner: style
          .merge({ padding: fontSize * 0.5 })
          .filter('background', 'paddingTop', 'paddingBottom'),
      }),
    ),
  )
  .yield(
    ({
      isOpen,
      modalProps,
      style,
      setClickElem,
      setInnerElem,
      fitSmall,
      children,
      setModalBase,
      next,
    }) => (
      <>
        {liftsElem &&
          isOpen &&
          ReactDOM.createPortal(
            <div className="e5 e6 e7 e8 e9" style={style.root}>
              {fitSmall && <div style={style.overlay} />}
              <div ref={setClickElem}>
                <div {...modalProps} style={style.outer}>
                  <div style={style.inner} ref={setInnerElem}>
                    {children}
                  </div>
                </div>
              </div>
            </div>,
            liftsElem,
          )}
        {next(props => ({ ...props, setModalBase }))}
      </>
    ),
  );
