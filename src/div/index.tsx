import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';

import getStyles, { DivStyle } from './getStyles';

export interface DivProps extends React.HTMLProps<{}> {
  style?: DivStyle;
}

const Div = compose<any, DivProps>(

  branch(
    ({ style }) => !style || !style.layout,
    renderComponent(({ children, ...otherProps }: React.HTMLProps<{}>) =>
      <div {...otherProps}>
        {children}
        <div style={{ display: 'table', clear: 'both' }} />
      </div>
    ),
  ),

  getStyles,

  branch(
    ({ divStyles: { layout } }) => layout === 'bar',
    compose(
      renderComponent(({ style, divStyles: { spacing, childWidths }, children, ...otherProps }) =>
        <div style={{ ...style, display: 'table', verticalAlign: undefined }} {...otherProps}>
          {React.Children.map(children, (child, i) => child &&
            <div key={i} style={{
              display: 'table-cell',
              verticalAlign: (style && style.verticalAlign) || 'middle',
              paddingLeft: (i !== 0 ? spacing[1] : 0),
              width: childWidths[i] || 'auto',
              boxSizing: 'content-box',
            }}>
              <div style={{ boxSizing: 'border-box' }}>{child}</div>
            </div>
          )}
        </div>
      ),
    ),
  ),

  branch(
    ({ divStyles: { layout } }) => layout === 'grid',
    compose(
      renderComponent(({ divStyles: { spacing }, children, ...otherProps }) =>
        <Div {...otherProps}>
          <div style={{ paddingTop: 1, paddingLeft: 1 }}>
            <div style={{
              marginTop: `-${parseFloat(spacing[0]) + 1}px`,
              marginLeft: `-${parseFloat(spacing[1]) + 1}px`,
            }}>
              {React.Children.map(children, (child, i) => child &&
                <div key={i} style={{
                  float: 'left', marginTop: spacing[0], marginLeft: spacing[1],
                }}>
                  {child}
                </div>
              )}
            </div>
          </div>
        </Div>
      ),
    ),
  ),

  branch(
    ({ divStyles: { layout } }) => layout === 'stack',
    compose(
      renderComponent(({ divStyles: { spacing }, children, ...otherProps }) =>
        <div {...otherProps}>
          {React.Children.map(children, (child, i) => child &&
            <Div key={i} style={{ paddingTop: (i !== 0 ? spacing[0] : 0) }}>
              {child}
            </Div>
          )}
        </div>
      ),
    ),
  ),

)('div' as any);

export default Div as React.ComponentClass<DivProps>;
