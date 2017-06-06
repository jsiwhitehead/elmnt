import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Txt from '../../src/txt';

describe('txt', () => {
  it('empty', () => {
    expect(renderer.create(<Txt />).toJSON()).toMatchSnapshot();
  });

  // it('content only', () => {
  //   expect(renderer.create(
  //     <Txt>Hello World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('placeholder only', () => {
  //   expect(renderer.create(
  //     <Txt placeholder="Hello World!" />
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('content with style', () => {
  //   expect(renderer.create(
  //     <Txt style={{ fontSize: 16, color: 'red', width: 100 }}>Hello World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('placeholder with style', () => {
  //   expect(renderer.create(
  //     <Txt placeholder="Hello World!" style={{ color: 'red', placeholder: { color: 'blue' } }} />
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('content with placeholder style', () => {
  //   expect(renderer.create(
  //     <Txt style={{ color: 'red', placeholder: { color: 'blue' } }}>Hello World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange only', () => {
  //   expect(renderer.create(
  //     <Txt onTextChange={console.log} />
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with content', () => {
  //   expect(renderer.create(
  //     <Txt onTextChange={console.log}>Hello World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with placeholder', () => {
  //   expect(renderer.create(
  //     <Txt placeholder="Hello World!" onTextChange={console.log} />
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with placeholder and content', () => {
  //   expect(renderer.create(
  //     <Txt placeholder="Hello!" onTextChange={console.log}>World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with rows', () => {
  //   expect(renderer.create(
  //     <Txt rows={3} onTextChange={console.log} />
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with rows and content', () => {
  //   expect(renderer.create(
  //     <Txt rows={3} onTextChange={console.log}>Hello World!</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });

  // it('onTextChange with rows and multi-line content', () => {
  //   expect(renderer.create(
  //     <Txt rows={3} onTextChange={console.log}>{'Hello\nWorld!'}</Txt>
  //   ).toJSON()).toMatchSnapshot();
  // });
});
