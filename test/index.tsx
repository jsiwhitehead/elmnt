import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { compose, withHandlers, withProps, withState } from 'recompose';

import { Div, Input, Mark, Txt } from '../src';

const processingGrey = 'rgba(255,255,255,.4)';

const inputStyle = {
  fontSize: 16,
  border: '2px solid blue',
  padding: '8px 10px',
  spacing: '10px 20px',
  borderRadius: 3,
  background: 'white',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15)',
  placeholder: {
    color: 'rgba(0,0,0,0.35)',
  },
  hover: {
    background: '#f6f6f6',
  },
  focus: {
    borderColor: 'darkblue',
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
  icon: {
    background: '#ccc',
    borderRadius: 3,
  },
  processing: {
    backgroundColor: '#f2f2f2',
    backgroundImage: `linear-gradient(45deg, ${[
      `${processingGrey} 25%`,
      'transparent 25%',
      'transparent 50%',
      `${processingGrey} 50%`,
      `${processingGrey} 75%`,
      'transparent 75%',
      'transparent',
    ].join(',')})`,
    backgroundSize: '40px 40px',
    animation: 'upload-bar 1s linear infinite',
    focus: {
      backgroundColor: '#ddd',
    },
  },
  button: {
    color: 'white',
    background: 'blue',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    width: 120,
    focus: {
      background: 'darkblue',
    },
  },
};

const TestApp = compose<any, any>(
  withState('state', 'setState', {
    1: 'hello',
    9: 'asdf:test.pdf',
  }),
  withHandlers({
    value: ({ state }) => name =>
      state[name] === undefined ? null : state[name],
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
      (res, i) => ({
        ...res,
        [`onChange${i}`]: ({ setState }) => value =>
          setState(state => ({ ...state, [i]: value })),
      }),
      {},
    ),
  }),
  withProps(({ state }) => console.log(state)),
)(({ value, ...props }) => (
  <Div style={{ padding: '50px 150px', layout: 'stack', spacing: 30 }}>
    <Txt>
      Hello <span style={{ fontWeight: 'bold' }}>there</span>,{' '}
      <span style={{ fontStyle: 'italic' }}>how</span> are you today?
    </Txt>

    <Mark>{`
# heading 1
## heading 2
### heading 3
#### heading 4

Hello *there*.

- here
- is
- a
- list
    `}</Mark>

    <Input
      value={value(1)}
      onChange={props.onChange1}
      type="string"
      style={inputStyle}
      spellCheck={false}
      placeholder="Enter value"
    />

    <Input
      value={value(2)}
      onChange={props.onChange2}
      type="date"
      style={inputStyle}
    />

    <Input
      value={value(3)}
      onChange={props.onChange3}
      type="boolean"
      options={{ on: true }}
      label="Hello"
      style={inputStyle}
    />

    <Input
      value={value(4)}
      onChange={props.onChange4}
      type="string"
      options={[null, 'One', 'Two', 'Three']}
      labels={['-- None --', 'One', 'Two', '~Group', 'Three']}
      style={inputStyle}
    />

    <Input
      value={value(5)}
      onChange={props.onChange5}
      type="stringlist"
      options={['One', 'Two', 'Three']}
      style={inputStyle}
    />

    <table>
      <tbody>
        <Input
          value={value(6)}
          onChange={props.onChange6}
          type="string"
          text="Hello"
          options={[null, 'One', 'Two', 'Three']}
          labels={['-- None --', 'One', 'Two', 'Three']}
          style={{ ...inputStyle, layout: 'table' }}
        />
      </tbody>
    </table>

    <Input
      value={value(7)}
      onChange={props.onChange7}
      type="string"
      options={[
        null,
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
      ]}
      labels={[
        '-- None --',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
      ]}
      style={{ ...inputStyle, layout: 'modal' }}
    />

    <Input
      value={value(8)}
      onChange={props.onChange8}
      type="stringlist"
      options={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
      placeholder="Select options"
      style={{ ...inputStyle, layout: 'modal' }}
    />

    <Input
      value={value(9)}
      onChange={props.onChange9}
      type="file"
      style={inputStyle}
      placeholder="Choose file"
      fileType="pdf"
      maxKb={100000}
      config={{
        uploader: 'google' as 'google',
        bucket: 'hub-test1',
        accessId: 'kalambo-storage@hub-meteor-platform.iam.gserviceaccount.com',
        serverUrl: 'http://localhost:3000/storage/upload',
      }}
    />
  </Div>
));

ReactDOM.render(<TestApp />, document.getElementById('root'));
