import { createTransform } from 'highstyle';

const block = createTransform(style => ({
  ...style,
  display: style.display === 'inline'
    ? 'inline-block'
    : style.display || 'block',
})) as any;

const lineHeightPx = createTransform(style => {
  if (!style.fontSize || !style.lineHeight) return style;

  const lineHeightNum = !isNaN(style.lineHeight as number)
    ? parseFloat(style.fontSize as string) * (style.lineHeight as number)
    : parseFloat(style.lineHeight as string);

  return { ...style, lineHeight: `${lineHeightNum}px` };
}) as any;

export default {
  block,
  lineHeightPx,
};
