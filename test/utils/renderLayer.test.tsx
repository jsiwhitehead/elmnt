import * as React from 'react';
import * as renderer from 'react-test-renderer';

import renderLayer from '../../src/utils/renderLayer';

describe('utils: renderLayer', () => {

  it('basic', () => {

    const Comp = renderLayer(({ style, children }) =>
      <div style={style}>{children}</div>
    )(({ style }) =>
      <p style={style}>Hello World!</p>
    );

    expect(renderer.create(
      <Comp style={{ color: 'red' }} />
    ).toJSON()).toMatchSnapshot();

  });

});
