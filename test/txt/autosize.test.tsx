import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Autosize from '../../src/txt/Autosize';

describe('txt: autosize', () => {

  it('single line of text, no rows', () => {
    expect(renderer.create(
      <Autosize value="Hello!" style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('single line of text, single row', () => {
    expect(renderer.create(
      <Autosize value="Hello!" rows={1} style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('single line of text, single row, overwritten style', () => {
    expect(renderer.create(
      <Autosize value="Hello!" rows={1} style={{ lineHeight: '30px', visibility: 'visible' }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('single line of text, three rows', () => {
    expect(renderer.create(
      <Autosize value="Hello!" rows={3} style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('multiple lines of text, no rows', () => {
    expect(renderer.create(
      <Autosize value={'Hello\nWorld!'} style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('multiple lines of text, single row', () => {
    expect(renderer.create(
      <Autosize value={'Hello\nWorld!'} rows={1} style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

  it('multiple lines of text, three rows', () => {
    expect(renderer.create(
      <Autosize value={'Hello\nWorld!'} rows={3} style={{ lineHeight: '30px', width: 100 }} />
    ).toJSON()).toMatchSnapshot();
  });

});
