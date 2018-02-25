import m, { Comp, restyle, watchHover } from 'mishmash';

export default m
  .do(watchHover)
  .map(
    restyle(['isHovered', 'styleKey'], (isHovered, styleKey = 'hover') => [
      ['mergeKeys', { [styleKey]: isHovered }],
    ]),
  )
  .toComp() as Comp;
