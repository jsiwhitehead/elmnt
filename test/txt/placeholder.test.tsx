import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Placeholder from '../../src/txt/Placeholder';

describe('txt: placeholder', () => {

  it('no text, empty value', () => {
    expect(renderer.create(
      <Placeholder value="" style={{ background: 'red' }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('text, empty value', () => {
    expect(renderer.create(
      <Placeholder text="Hello!" value="" style={{ background: 'red' }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('text, value', () => {
    expect(renderer.create(
      <Placeholder text="Hello!" value="World!" style={{ background: 'red' }} />
    ).toJSON()).toMatchSnapshot();
  });

});
