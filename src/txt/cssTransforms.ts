import { createTransform } from 'highstyle';

const block = createTransform(style => ({
  ...style,
  display: style.display === 'inline' ? 'inline-block' : (style.display || 'block'),
}));

const lineHeightPx = createTransform(style => {

  if (!style.fontSize || !style.lineHeight) return style;

  const lineHeightNum = !isNaN(style.lineHeight as number) ?
    parseFloat(style.fontSize as string) * (style.lineHeight as number) :
    parseFloat(style.lineHeight as string);

  return { ...style, lineHeight: `${lineHeightNum}px` };

});

export default {
  block,
  lineHeightPx,
};
