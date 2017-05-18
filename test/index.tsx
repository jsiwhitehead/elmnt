import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { compose, withHandlers, withProps, withState } from 'recompose';

// import Div from '../src/div';
// import Txt from '../src/txt';
import Input from '../src/input';

const inputStyle = {
  fontSize: 16,
  border: '2px solid blue',
  padding: 10,
  spacing: '10px 20px',
  placeholder: {
    color: 'rgba(0,0,0,0.35)',
  },
  hover: {
    background: '#f6f6f6',
  },
  focus: {
    borderColor: 'black',
    active: {
      borderColor: 'lightblue',
      background: '#ddd',
    },
  },
  selected: {
    fontWeight: 'bold',
  },
  group: {
    fontWeight: 'bold',
  },
  key: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  row: {
    background: 'rgba(0,0,0,0.03)',
  },
  none: {
    fontStyle: 'italic',
  },
};

const TestApp = compose<any, any>(

  withState('state', 'setState', {}),

  withHandlers({
    value: ({ state }) => (name) => (
      state[name] === undefined ? null : state[name]
    ),
    ...([1, 2, 3, 4, 5, 6, 7, 8].reduce((res, i) => ({ ...res,
      [`onChange${i}`]: ({ setState }) => (
        (value) => setState(state => ({ ...state, [i]: value }))
      ),
    }), {})),
  }),

  withProps(({ state }) => console.log(state)),

)(({ value, ...props }) => (
  <div style={{ padding: 100 }}>

    <Input
      value={value(1) as string} onChange={props.onChange1}
      type="text" style={inputStyle} spellCheck={false} placeholder="Enter value"
    />

    <br />

    <Input
      value={value(2) as Date} onChange={props.onChange2} type="date" style={inputStyle}
    />

    <br />

    <Input
      value={value(3) as boolean} onChange={props.onChange3}
      type="boolean" options={{ on: true }} label="Hello" style={inputStyle}
    />

    <br />

    <Input
      value={value(4) as string} onChange={props.onChange4}
      type="text" options={[null, 'One', 'Two', 'Three']}
      labels={['-- None --', 'One', 'Two', '~Group', 'Three']} style={inputStyle}
    />


    <br />

    <Input
      value={value(5) as string[]} onChange={props.onChange5}
      type="textlist" options={['One', 'Two', 'Three']} style={inputStyle}
    />

    <br />

    <table>
      <tbody>
        <Input
          value={value(6) as string} onChange={props.onChange6} type="text" text="Hello"
          options={[null, 'One', 'Two', 'Three']} labels={['-- None --', 'One', 'Two', 'Three']}
          style={{ ...inputStyle, layout: 'table' }}
        />
      </tbody>
    </table>

    <br />

    <Input
      value={value(7) as string} onChange={props.onChange7} type="text"
      options={[null, 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
      labels={['-- None --', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
      style={{ ...inputStyle, layout: 'modal' }}
    />

    <br />

    <Input
      value={value(8) as string[]} onChange={props.onChange8}
      type="textlist" options={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
      placeholder="Enter value" style={{ ...inputStyle, layout: 'modal' }}
    />


{/*
    <br />

    <WrappedInput
      type="Boolean" onValue={true} text="Hello world" style={inputStyle}
    />

    <br />

    <WrappedInput
      type="String" options={['One', 'Two', 'Three']}
      labels={['One', 'Two', '~Group', 'Three']} style={inputStyle}
    />

    <br />

    <WrappedInput
      type="StringList" options={['One', 'Two', 'Three']}
      labels={['One', 'Two', '~Group', 'Three']} style={inputStyle}
    />

    <br />

    <WrappedInput
      type="String" options={['One', 'Two', 'Three']} modal
      labels={['One', 'Two', '~Group', 'Three']} style={inputStyle}
    />

    <br />

    <WrappedInput
      type="StringList" options={['One', 'Two', 'Three']} modal
      labels={['One', 'Two', '~Group', 'Three']} style={inputStyle}
    />

    <br />

    */}
{/*
    <br />

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
    <StateTxt rows={3} style={{ background:'lightblue', border: '1px solid blue' }} />*/}

  </div>
));

ReactDOM.render(
  <TestApp />,
  document.getElementById('root'),
);
