import * as React from 'react';
import { compose } from 'recompose';
import {
  Comp,
  focusOnMouse,
  mapPropsStream,
  mapStyle,
  Obj,
  streamState,
} from 'mishmash';

import parsers from './parsers';

export default function createText({ Label }: Obj<Comp>) {
  return compose<any, any>(
    focusOnMouse,
    mapPropsStream(props$ => {
      const state = { props: {} as any, text: '', config: {} as Obj };

      const { state$: text$, setState: setText } = streamState();

      const onTextChange = text => {
        const { type, value, onChange } = state.props;

        const parsed = text
          ? parsers[type].parse(text, state.props)
          : { value: null };
        state.config = parsed.config || {};
        state.text = parsed.text !== undefined ? parsed.text : text;

        if (!parsers[type].equals(value, parsed.value)) onChange(parsed.value);
        else setText(state.text);
      };

      props$.observe(props => {
        if (props.value !== state.props.value) {
          if (
            props.value === null &&
            parsers[props.type].parse(state.text, props).value === null
          ) {
            setText(state.text);
          } else {
            setText(
              parsers[props.type].format(props.value, state.config, props),
            );
          }
        }
        state.props = props;
      });

      return props$.combine(
        (props, text) => ({
          ...props,

          text,
          onTextChange,

          ...props.password
            ? {
                iconRight: 'lock',
              }
            : {},

          ...props.type === 'date'
            ? {
                placeholder:
                  props.placeholder || (props.noDay ? 'MM/YY' : 'DD/MM/YY'),
                iconRight: text && (props.value === null ? 'cross' : 'tick'),
              }
            : {},

          ...props.type === 'stringlist'
            ? {
                rows: (props.value || ['']).length + 1,
                placeholder: [
                  'Option 1',
                  ...(props.value || ['']).map((_, i) => `Option ${i + 2}`),
                ].join('\n'),
                prompt: true,
              }
            : {},
        }),
        text$,
      );
    }),
    mapStyle(['isFocused'], isFocused => ({
      div: [['filter', 'display', 'width', 'height', 'maxWidth', 'maxHeight']],
      label: [
        ['mergeKeys', { active: isFocused }],
        ['merge', { cursor: 'text' }],
      ],
    })),
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
}
