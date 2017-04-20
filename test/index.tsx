import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withState } from 'recompose';

import Div from '../src/div';
import Txt from '../src/txt';

const StateTxt = withState<any>('children', 'onTextChange', 'Hello world!')(Txt);

ReactDOM.render(
  <div style={{ padding: 100 }}>

    <Div style={{ background: 'lightblue' }}>
      <div style={{ float: 'left', width: 60, height: 20, border: '1px solid blue' }} />
    </Div>

    <br />

    <Div style={{ layout: 'bar', spacing: '10px 20px', background:'lightblue' }}>
      <div style={{ width: 60, height: 20, border: '1px solid blue' }} />
      <div style={{ width: 50, height: 40, border: '1px solid blue' }} />
      {null}
      <div style={{ width: 40, height: 30, border: '1px solid blue' }} />
    </Div>

    <br />

    <Div style={{ layout: 'grid', spacing: '10px 20px', background:'lightblue', width: 150 }}>
      <div style={{ width: 60, height: 20, border: '1px solid blue' }} />
      <div style={{ width: 50, height: 40, border: '1px solid blue' }} />
      {null}
      <div style={{ width: 40, height: 30, border: '1px solid blue' }} />
    </Div>

    <br />

    <Div style={{ layout: 'stack', spacing: '10px 20px', background:'lightblue' }}>
      <div style={{ width: 60, height: 20, border: '1px solid blue' }} />
      <div style={{ width: 50, height: 40, border: '1px solid blue' }} />
      {null}
      <div style={{ width: 40, height: 30, border: '1px solid blue' }} />
    </Div>

    <br />

    <Txt>Hello world!</Txt>
    <Txt placeholder="Hello world!" style={{ placeholder: { color: '#bbb' } }} />
    <Txt placeholder="Hello" style={{ placeholder: { color: '#bbb' } }}>World!</Txt>

    <br />

    <StateTxt />
    <StateTxt placeholder="Hello" style={{ placeholder: { color: '#bbb' } }} />
    <StateTxt password />
    <StateTxt tab={2} />
    <StateTxt style={{ background:'lightblue', border: '1px solid blue', padding: 20 }} />
    <StateTxt rows={1} style={{ background:'lightblue', border: '1px solid blue' }} />
    <StateTxt rows={3} style={{ background:'lightblue', border: '1px solid blue' }} />

  </div>,
  document.getElementById('root'),
);
