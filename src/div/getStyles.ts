import { withProps } from 'recompose';
import { HOC } from 'mishmash';

export interface DivStyle extends React.CSSProperties {
  layout?: 'bar' | 'grid' | 'stack';
  spacing?: number | string;
}

const getSpacing = (spacing?: string | number) => {
  if (!spacing) return [0, 0];
  if (typeof spacing === 'number') return [spacing, spacing];
  const spacingSplit = spacing.split(/\s+/);
  return [spacingSplit[0], spacingSplit[1] || spacingSplit[0]];
};

export default withProps(
  ({ style: { layout, spacing, ...otherStyle } = {} as any }) => ({
    style: otherStyle,
    divStyles: {
      layout,
      spacing: getSpacing(spacing),
    },
  })
) as HOC;
