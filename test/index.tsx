import * as React from 'react';
import * as ReactDOM from 'react-dom';
import m from 'mishmash';
import keysToObject from 'keys-to-object';

import { css, Div, Input, Mark, Txt } from '../src';

const div = document.createElement('div');
div.innerHTML = `&shy;<style>${css.base}</style>`;
document.body.appendChild(div.childNodes[1]);

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

const TestApp = m.stream((observe, push) => {
  push({ value1: 'hello', value9: 'asdf:test.pdf' });
  observe(null, props => {
    console.log(
      keysToObject(
        Object.keys(props).filter(k => k.startsWith('$value')),
        k => props[k],
      ),
    );
  });
  return keysToObject(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    k => value => push({ [`value${k}`]: value }),
    k => `onChange${k}`,
  );
})(props => (
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
      value={props.value1}
      onChange={props.onChange1}
      type="string"
      style={inputStyle}
      spellCheck={false}
      placeholder="Enter value"
      rows={0}
    />
    <Input
      value={props.value2}
      onChange={props.onChange2}
      type="date"
      style={inputStyle}
    />
    <Input
      value={props.value3}
      onChange={props.onChange3}
      type="boolean"
      label="Hello"
      style={inputStyle}
    />
    <Input
      value={props.value4}
      onChange={props.onChange4}
      type="string"
      options={[null, 'One', 'Two', 'Three']}
      labels={['-- None --', 'One', 'Two', '~Group', 'Three']}
      style={inputStyle}
    />
    <Input
      value={props.value5}
      onChange={props.onChange5}
      type="stringlist"
      options={['One', 'Two', 'Three']}
      style={inputStyle}
    />
    <table>
      <tbody>
        <Input
          value={props.value6}
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
      value={props.value7}
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
      value={props.value8}
      onChange={props.onChange8}
      type="stringlist"
      options={['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']}
      placeholder="Select options"
      style={{ ...inputStyle, layout: 'modal' }}
    />
    <Input
      value={props.value9}
      onChange={props.onChange9}
      type="file"
      style={inputStyle}
      placeholder="Choose file"
      fileType="pdf"
      maxKb={100000}
      config={{
        uploader: 'google' as 'google',
        bucket: 'kalambo-assets',
        accessId: 'kalambo-storage-a@kalambo-platform.iam.gserviceaccount.com',
        serverUrl: 'http://localhost:3000/storage/upload',
      }}
    />
  </Div>
));

ReactDOM.render(<TestApp />, document.getElementById('root'));
