import * as React from 'react';
import { render } from 'enzyme';

import Autosize from '../../src/txt/Autosize';

describe('txt: autosize', () => {
  it('single line of text, no rows', () => {
    expect(
      render(
        <Autosize value="Hello!" style={{ lineHeight: '30px', width: 100 }} />,
      ),
    ).toMatchSnapshot();
  });

  it('single line of text, single row', () => {
    expect(
      render(
        <Autosize
          value="Hello!"
          rows={1}
          style={{ lineHeight: '30px', width: 100 }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('single line of text, single row, overwritten style', () => {
    expect(
      render(
        <Autosize
          value="Hello!"
          rows={1}
          style={{ lineHeight: '30px', visibility: 'visible' }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('single line of text, three rows', () => {
    expect(
      render(
        <Autosize
          value="Hello!"
          rows={3}
          style={{ lineHeight: '30px', width: 100 }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('multiple lines of text, no rows', () => {
    expect(
      render(
        <Autosize
          value={'Hello\nWorld!'}
          style={{ lineHeight: '30px', width: 100 }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('multiple lines of text, single row', () => {
    expect(
      render(
        <Autosize
          value={'Hello\nWorld!'}
          rows={1}
          style={{ lineHeight: '30px', width: 100 }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('multiple lines of text, three rows', () => {
    expect(
      render(
        <Autosize
          value={'Hello\nWorld!'}
          rows={3}
          style={{ lineHeight: '30px', width: 100 }}
        />,
      ),
    ).toMatchSnapshot();
  });
});
