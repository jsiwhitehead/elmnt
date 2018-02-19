import * as React from 'react';
import { branch, Comp, compose, map, render } from 'mishmash';

export interface DivStyle extends React.CSSProperties {
  layout?: 'bar' | 'grid' | 'stack';
  spacing?: number | string;
}
export interface DivProps extends React.HTMLProps<{}> {
  style?: DivStyle;
}

const getElmntClass = (className: string = '') => `${className} e0 e1 e2 e3 e4`;

const getSpacing = (spacing?: string | number) => {
  if (!spacing) return [0, 0];
  if (typeof spacing === 'number') return [spacing, spacing];
  const spacingSplit = spacing.split(/\s+/);
  return [spacingSplit[0], spacingSplit[1] || spacingSplit[0]];
};

const mapChildren = (
  children: React.ReactNode,
  map: (child, i, first) => any,
) => {
  let first = true;
  return React.Children.map(children, (child, i) => {
    if (child) {
      const result = map(child, i, first);
      first = false;
      return result;
    }
  });
};

const Div = compose(
  branch(
    ({ style }) => !(style && (style.layout || style.spacing)),
    render(({ children, inner: _, ...otherProps }) => (
      <div {...otherProps} className={getElmntClass(otherProps.className)}>
        {children}
        <div
          style={{ display: 'table', clear: 'both' }}
          className={getElmntClass()}
        />
      </div>
    )),
  ),
  map(
    ({ style: { layout, spacing, ...otherStyle } = {} as any, ...props }) => ({
      ...props,
      style: otherStyle,
      divStyles: { layout, spacing: getSpacing(spacing) },
    }),
  ),
  branch(
    ({ divStyles: { layout } }) => layout === 'bar',
    render(
      ({
        style,
        divStyles: { spacing },
        children,
        inner: _,
        ...otherProps
      }) => (
        <div
          style={{ ...style, display: 'table', verticalAlign: undefined }}
          {...otherProps}
          className={getElmntClass(otherProps.className)}
        >
          {mapChildren(children, (child, i, first) => (
            <div
              style={{
                display: 'table-cell',
                verticalAlign: (style && style.verticalAlign) || 'middle',
                paddingLeft: first ? 0 : spacing[1],
                width: (child.props.style && child.props.style.width) || 'auto',
                boxSizing: 'content-box !important',
              }}
              className={getElmntClass('e10')}
              key={i}
            >
              <div className={getElmntClass()}>{child}</div>
            </div>
          ))}
        </div>
      ),
    ),
  ),
  branch(
    ({ divStyles: { layout } }) => layout === 'grid',
    render(({ divStyles: { spacing }, children, inner: _, ...otherProps }) => (
      <Div {...otherProps}>
        <div
          style={{ paddingTop: 1, paddingLeft: 1 }}
          className={getElmntClass()}
        >
          <div
            style={{
              marginTop: `-${parseFloat(spacing[0]) + 1}px`,
              marginLeft: `-${parseFloat(spacing[1]) + 1}px`,
            }}
            className={getElmntClass()}
          >
            {mapChildren(children, (child, i) => (
              <div
                style={{
                  float: 'left',
                  marginTop: spacing[0],
                  marginLeft: spacing[1],
                  width:
                    (child.props.style && child.props.style.width) || 'auto',
                }}
                className={getElmntClass()}
                key={i}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </Div>
    )),
  ),
  branch(
    ({ divStyles: { layout } }) => !layout || layout === 'stack',
    render(({ divStyles: { spacing }, children, inner: _, ...otherProps }) => (
      <div {...otherProps} className={getElmntClass(otherProps.className)}>
        {mapChildren(children, (child, i, first) => (
          <Div key={i} style={{ paddingTop: first ? 0 : spacing[0] }}>
            {child}
          </Div>
        ))}
      </div>
    )),
  ),
)('div' as any);

export default Div as Comp<DivProps>;
