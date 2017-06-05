import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Div from '../../src/div';

describe('div', () => {

  it('no layout', () => {
    expect(renderer.create(
      <Div style={{ background: 'red' }}>
        <p>Hello</p>
        <p>World!</p>
      </Div>
    ).toJSON()).toMatchSnapshot();
  });

  it('bar layout with numeric spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'bar', spacing: 10, background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('bar layout with string multi-spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'bar', spacing: '10px 20px', background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('bar layout with child width', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'bar', spacing: 10, background:'red' }}>
        <div style={{ width: 100 }}></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('bar layout with multiple child width', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'bar', spacing: 10, background:'red' }}>
        <div style={{ width: '10px' }}></div>
        <div></div>
        {null}
        <div style={{ width: '20px' }}></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('grid layout with numeric spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'grid', spacing: 10, background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('grid layout with string spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'grid', spacing: '10px', background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('grid layout with string multi-spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'grid', spacing: '10px 20px', background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('stack layout with numeric spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'stack', spacing: 10, background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('stack layout with string spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'stack', spacing: '10px', background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('stack layout with string multi-spacing', () => {
    const tree = renderer.create(
      <Div style={{ layout: 'stack', spacing: '10px 20px', background:'red' }}>
        <div></div>
        <div></div>
        {null}
        <div></div>
      </Div>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
