import * as React from 'react';
import { compose, enclose, focusOnMouse, map, restyle } from 'mishmash';

import Label from '../components/Label';

import parsers from './parsers';

export default compose(
  focusOnMouse,
  enclose(({ onProps, setState }) => {
    setState({ text: '' });
    const state = { props: {} as any, text: '', config: {} as any };

    const onTextChange = text => {
      const { type, value, onChange } = state.props;

      const parsed = text
        ? parsers[type].parse(text, state.props)
        : { value: null };
      state.config = parsed.config || {};
      state.text = parsed.text !== undefined ? parsed.text : text;

      if (!parsers[type].equals(value, parsed.value)) onChange(parsed.value);
      else setState({ text: state.text });
    };

    onProps(props => {
      if (props && props.value !== state.props.value) {
        if (
          props.value === null &&
          parsers[props.type].parse(state.text, props).value === null
        ) {
          setState({ text: state.text });
        } else {
          setState({
            text: parsers[props.type].format(props.value, state.config, props),
          });
        }
      }
      state.props = props;
    });

    return (props, { text }) => ({
      ...props,

      text,
      onTextChange,

      ...(props.password ? { iconRight: 'lock' } : {}),

      ...(props.type === 'date'
        ? {
            placeholder:
              props.placeholder || (props.noDay ? 'MM/YY' : 'DD/MM/YY'),
            iconRight: text && (props.value === null ? 'cross' : 'tick'),
          }
        : {}),

      ...(props.type === 'stringlist'
        ? {
            rows: (props.value || ['']).length + 1,
            placeholder: [
              'Option 1',
              ...(props.value || ['']).map((_, i) => `Option ${i + 2}`),
            ].join('\n'),
            prompt: true,
          }
        : {}),
    });
  }),
  map(
    restyle(['isFocused'], isFocused => ({
      div: [
        [
          'filter',
          'display',
          'width',
          'height',
          'maxWidth',
          'maxHeight',
          'verticalAlign',
        ],
      ],
      label: [
        ['mergeKeys', { active: isFocused }],
        ['merge', { display: 'block', cursor: 'text' }],
      ],
    })),
  ),
)(
  ({
    text,
    onTextChange,
    iconLeft,
    iconRight,
    placeholder,
    prompt,
    rows,
    password,
    tab,
    spellCheck,
    onMouseDown,
    onKeyDown,
    hoverProps,
    focusProps,
    setFocusElem,
    style,
  }) => (
    <div
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
      {...hoverProps}
      style={style.div}
      className="e5 e6 e7 e8 e9"
    >
      <Label
        text={text}
        onTextChange={onTextChange}
        iconLeft={iconLeft}
        iconRight={iconRight}
        placeholder={placeholder}
        prompt={prompt}
        rows={rows}
        password={password}
        tab={tab}
        spellCheck={spellCheck}
        focusProps={focusProps}
        setFocusElem={setFocusElem}
        style={style.label}
      />
    </div>
  ),
);
