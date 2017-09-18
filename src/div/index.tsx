import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';

import getStyles, { DivStyle } from './getStyles';

export interface DivProps extends React.HTMLProps<{}> {
  style?: DivStyle;
}

const getElmntClass = (className: string = '') => `${className} e0 e1 e2 e3 e4`;

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

const Div = compose<any, DivProps>(
  branch(
    ({ style }) => !(style && (style.layout || style.spacing)),
    renderComponent(({ children, ...otherProps }: DivProps) => (
      <div {...otherProps} className={getElmntClass(otherProps.className)}>
        {children}
        <div
          style={{ display: 'table', clear: 'both' }}
          className={getElmntClass()}
        />
      </div>
    )),
  ),
  getStyles,
  branch(
    ({ divStyles: { layout } }) => layout === 'bar',
    compose(
      renderComponent(
        ({ style, divStyles: { spacing }, children, ...otherProps }: any) => (
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
                  width:
                    (child.props.style && child.props.style.width) || 'auto',
                  boxSizing: 'content-box',
                }}
                className={getElmntClass()}
                key={i}
              >
                <div className={getElmntClass('e10')}>{child}</div>
              </div>
            ))}
          </div>
        ),
      ),
    ),
  ),
  branch(
    ({ divStyles: { layout } }) => layout === 'grid',
    compose(
      renderComponent(
        ({ divStyles: { spacing }, children, ...otherProps }: any) => (
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
                        (child.props.style && child.props.style.width) ||
                        'auto',
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
        ),
      ),
    ),
  ),
  branch(
    ({ divStyles: { layout } }) => !layout || layout === 'stack',
    compose(
      renderComponent(
        ({ divStyles: { spacing }, children, ...otherProps }: any) => (
          <div {...otherProps} className={getElmntClass(otherProps.className)}>
            {mapChildren(children, (child, i, first) => (
              <Div key={i} style={{ paddingTop: first ? 0 : spacing[0] }}>
                {child}
              </Div>
            ))}
          </div>
        ),
      ),
    ),
  ),
)('div' as any);

export default Div as React.ComponentClass<DivProps>;
