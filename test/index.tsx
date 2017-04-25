import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withState } from 'recompose';

// import Div from '../src/div';
// import Txt from '../src/txt';
import Input from '../src/input';

import { PortalRoot } from '../src/utils';

// const StateTxt = withState<any>('children', 'onTextChange', 'Hello world!')(Txt);
const WrappedInput = withState<any>('value', 'onChange', null)(Input);

const inputStyle = {
  fontSize: 20,
  border: '2px solid blue',
  padding: 10,
  spacing: '10px 20px',
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
  alt: {
    background: 'rgba(0,0,0,0.03)',
    hover: {
      background: '#eee',
    },
  },
};

ReactDOM.render(
  <div style={{ padding: 100 }}>

    <PortalRoot>

      <WrappedInput type="text" style={inputStyle} />

      <br />

      <WrappedInput type="boolean" options={{}} text="Hello" style={inputStyle}/>

      <br />

      <WrappedInput
        type="text" options={['One', 'Two', 'Three']}
        labels={['One', 'Two', '~Group', 'Three']} style={inputStyle}
      />

      <br />

      <WrappedInput type="textlist" options={['One', 'Two', 'Three']} style={inputStyle} />

      <br />

      <table>
        <tbody>
          <WrappedInput
            type="text" text="Hello" options={['One', 'Two', 'Three']}
            style={{ ...inputStyle, layout: 'table' }}
          />
        </tbody>
      </table>

      <br />

      <WrappedInput
        type="text" options={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
        style={{ ...inputStyle, layout: 'modal' }}
      />

      <br />

      <WrappedInput
        type="textlist" options={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
        style={{ ...inputStyle, layout: 'modal' }}
      />

    </PortalRoot>


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

  </div>,
  document.getElementById('root'),
);
