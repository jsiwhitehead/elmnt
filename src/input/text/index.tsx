import * as React from 'react';
import m from 'mishmash';
import st from 'style-transform';

import Label from '../components/Label';

import parsers from './parsers';

export default m
  .merge(null, props => ({
    parseText: text => parsers[props.type].parse(text, props),
    formatValue: (value, config) =>
      parsers[props.type].format(value, config, props),
  }))
  .merge((props$, push) => {
    let config = {};
    push({
      onTextChange: text => {
        const { type, value, onChange, onTextChange, parseText } = props$();

        const parsed = text ? parseText(text) : { value: null };
        config = parsed.config || {};
        const parsedText = parsed.text !== undefined ? parsed.text : text;
        push({ text: parsedText });
        onTextChange && onTextChange(parsedText);
        if (!parsers[type].equals(value, parsed.value)) onChange(parsed.value);
      },
    });
    props$('value', value => {
      const { onTextChange, parseText, formatValue, $text } = props$();

      if (value !== null || parseText($text || '').value !== null) {
        const newText = formatValue(value, config);
        push({ text: newText });
        onTextChange && onTextChange(newText);
      }
    });
  })
  .merge(
    'type',
    'value',
    'placeholder',
    'password',
    'noDay',
    'text',
    (type, value, placeholder, password, noDay, text) => ({
      ...(password ? { iconRight: 'lock' } : {}),

      ...(type === 'date'
        ? {
            placeholder: placeholder || (noDay ? 'MM/YY' : 'DD/MM/YY'),
            iconRight: text && (value === null ? 'cross' : 'tick'),
          }
        : {}),

      ...(type === 'stringlist'
        ? {
            rows: (value || ['']).length + 1,
            placeholder: [
              'Option 1',
              ...(value || ['']).map((_, i) => `Option ${i + 2}`),
            ].join('\n'),
            prompt: true,
          }
        : {}),
    }),
  )
  .merge('style', 'isFocused', (style, isFocused) => ({
    style: {
      div: st(style).filter(
        'display',
        'width',
        'height',
        'maxWidth',
        'maxHeight',
        'verticalAlign',
      ),
      label: st(style)
        .mergeKeys({ active: isFocused })
        .merge({ display: 'block', cursor: 'text' }),
    },
  }))(
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
