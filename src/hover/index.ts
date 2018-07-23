import r from 'refluent';

import { restyle, watchHover } from '../utils';

export default r
  .label('Hover')
  .do(watchHover)
  .do(
    restyle('isHovered', 'styleKey', (isHovered, styleKey = 'hover', style) =>
      style.mergeKeys({ [styleKey]: isHovered }),
    ),
  );
