import * as React from 'react';

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

const Div = ({
  style: { layout, spacing: baseSpacing, ...style } = {} as any,
  children,
  ...props
}: DivProps) => {
  if (!layout && !baseSpacing) {
    return (
      <div {...props} style={style} className={getElmntClass(props.className)}>
        {children}
        <div
          style={{ display: 'table', clear: 'both' }}
          className={getElmntClass()}
        />
      </div>
    );
  }
  const spacing = getSpacing(baseSpacing);
  if (layout === 'bar') {
    return (
      <div
        {...props}
        style={{ ...style, display: 'table', verticalAlign: undefined }}
        className={getElmntClass(props.className)}
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
    );
  }
  if (layout === 'grid') {
    return (
      <Div {...props} style={style}>
        <div
          style={{ paddingTop: 1, paddingLeft: 1 }}
          className={getElmntClass()}
        >
          <div
            style={{
              marginTop: `-${parseFloat(spacing[0] as string) + 1}px`,
              marginLeft: `-${parseFloat(spacing[1] as string) + 1}px`,
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
    );
  }
  return (
    <div {...props} style={style} className={getElmntClass(props.className)}>
      {mapChildren(children, (child, i, first) => (
        <Div key={i} style={{ paddingTop: first ? 0 : spacing[0] }}>
          {child}
        </Div>
      ))}
    </div>
  );
};

export default Div;
