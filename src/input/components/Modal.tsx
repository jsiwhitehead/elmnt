import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';
import { withBounds} from 'mishmash';

export default compose<any, any>(

  withBounds('inner', 'setInnerElem'),
  withBounds('root', 'setRootElem'),
  withBounds('screen'),

  mapStyle([
    'screen', 'root', 'inner', 'style.fontSize'
  ], (
    screen, root = { top: 0 } as any, inner = { height: 0 } as any, fontSize,
  ) => ({
    root: [{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }],
    overlay: [{
      position: 'fixed', top: 0, right: 0, bottom: 0, left: 0,
      background: screen.width < 500 ? 'rgba(0,0,0,0.5)' : 'none',
    }],
    outer: [
      ['filter', 'borderRadius'],
      ['merge', {
        position: 'fixed' as 'fixed',
        height: Math.min(inner.height, screen.height - fontSize * 0.5),
        boxShadow: screen.width < 500 ?
          '0 2px 25px rgba(0,0,0,0.5)' : '0 2px 20px 5px rgba(0,0,0,0.4)',
        overflow: 'auto' as 'auto',
        ...((screen.width < 500) ? {
          left: 50, width: screen.width - 100,
          top: Math.max(fontSize * 0.25, (screen.height - inner.height) * 0.5),
        } : {
          left: root.left, width: root.width,
          top: Math.max(
            fontSize * 0.25, Math.min(root.top, screen.height - inner.height - fontSize * 0.25),
          ),
        }),
      }],
    ],
    inner: [
      ['scale', { fontSize: { padding: 0.5 } }],
      ['filter', 'background', 'paddingTop', 'paddingBottom'],
    ],
  })),

)(({ closeModal, modalProps, style, setRootElem, setInnerElem, children }) =>
  <div style={style.root} ref={setRootElem}>
    <div onClick={closeModal} style={style.overlay} />
    <div {...modalProps} style={style.outer}>
      <div style={style.inner} ref={setInnerElem}>
        {children}
      </div>
    </div>
  </div>
);
