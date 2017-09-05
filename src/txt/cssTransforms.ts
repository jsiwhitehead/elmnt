import { createStyleTransform } from 'mishmash';

const block = createStyleTransform(style => ({
  ...style,
  display:
    style.display === 'inline' ? 'inline-block' : style.display || 'block',
}));

const lineHeightPx = createStyleTransform(style => {
  if (!style.fontSize || !style.lineHeight) return style;

  const lineHeightNum = !isNaN(style.lineHeight as number)
    ? parseFloat(style.fontSize as string) * (style.lineHeight as number)
    : parseFloat(style.lineHeight as string);

  return { ...style, lineHeight: `${lineHeightNum}px` };
});

export default {
  block,
  lineHeightPx,
} as any;
