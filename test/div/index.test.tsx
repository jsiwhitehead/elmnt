import * as React from 'react';
import { render } from 'enzyme';

import Div from '../../src/div';

describe('div', () => {
  it('no layout', () => {
    expect(
      render(
        <Div style={{ background: 'red' }}>
          <p>Hello</p>
          <p>World!</p>
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('bar layout with numeric spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'bar', spacing: 10, background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('bar layout with string multi-spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'bar', spacing: '10px 20px', background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('bar layout with child width', () => {
    expect(
      render(
        <Div style={{ layout: 'bar', spacing: 10, background: 'red' }}>
          <div style={{ width: 100 }} />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('bar layout with multiple child width', () => {
    expect(
      render(
        <Div style={{ layout: 'bar', spacing: 10, background: 'red' }}>
          <div style={{ width: '10px' }} />
          <div />
          {null}
          <div style={{ width: '20px' }} />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('grid layout with numeric spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'grid', spacing: 10, background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('grid layout with string spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'grid', spacing: '10px', background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('grid layout with string multi-spacing', () => {
    expect(
      render(
        <Div
          style={{ layout: 'grid', spacing: '10px 20px', background: 'red' }}
        >
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('stack layout with numeric spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'stack', spacing: 10, background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('stack layout with string spacing', () => {
    expect(
      render(
        <Div style={{ layout: 'stack', spacing: '10px', background: 'red' }}>
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });

  it('stack layout with string multi-spacing', () => {
    expect(
      render(
        <Div
          style={{ layout: 'stack', spacing: '10px 20px', background: 'red' }}
        >
          <div />
          <div />
          {null}
          <div />
        </Div>,
      ),
    ).toMatchSnapshot();
  });
});
