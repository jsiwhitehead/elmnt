import * as React from 'react';
import { compose, onlyUpdateForKeys, withState } from 'recompose';

import { withContext } from '../context';
import renderLayer from '../renderLayer';
import withBounds from '../withBounds';

export default compose<any, any>(

  withState('portalContent', 'setPortalContent', null),

  withBounds('portalPosition', 'setPortalBaseElem'),

  withContext(
    'portal',
    ({ setPortalContent, setPortalBaseElem }) => ({
      render: setPortalContent, setBaseElem: setPortalBaseElem,
    }),
    (newValue, oldValue) => ['render', 'setBaseElem'].some(k => newValue[k] !== oldValue[k]),
  ),

  renderLayer(({ portalContent, portalPosition, children }) =>
    <div>
      {children}
      {portalContent &&
        <div style={{ position: 'fixed', ...portalPosition }}>
          {portalContent}
        </div>
      }
    </div>
  ),

  onlyUpdateForKeys(['children']),

)(({ children }) => <div>{children}</div>);
