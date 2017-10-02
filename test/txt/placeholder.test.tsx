import * as React from 'react';
import { render } from 'enzyme';

import Placeholder from '../../src/txt/Placeholder';

describe('txt: placeholder', () => {
  it('no text, empty value', () => {
    expect(
      render(<Placeholder value="" style={{ background: 'red' }} />),
    ).toMatchSnapshot();
  });

  it('text, empty value', () => {
    expect(
      render(
        <Placeholder text="Hello!" value="" style={{ background: 'red' }} />,
      ),
    ).toMatchSnapshot();
  });

  it('text, value', () => {
    expect(
      render(
        <Placeholder
          text="Hello!"
          value="World!"
          style={{ background: 'red' }}
        />,
      ),
    ).toMatchSnapshot();
  });
});
