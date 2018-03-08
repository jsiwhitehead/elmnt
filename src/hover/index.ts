import m, { Comp, watchHover } from 'mishmash';
import st from 'style-transform';

export default m
  .do(watchHover)
  .merge(
    'style',
    'isHovered',
    'styleKey',
    (style, isHovered, styleKey = 'hover') => ({
      style: st(style).mergeKeys({ [styleKey]: isHovered }),
    }),
  )
  .toComp() as Comp;
