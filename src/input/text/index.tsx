import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle } from 'highstyle';
import { Comp, focusOnMouse, mapPropsStream, Obj, streamState } from 'mishmash';

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
                icon: ['', 'lock'],
              }
            : {},

          ...props.type === 'date'
            ? {
                placeholder:
                  props.placeholder || (props.noDay ? 'MM/YY' : 'DD/MM/YY'),
                icon: text && ['', props.value === null ? 'cross' : 'tick'],
              }
            : {},
        }),
        text$,
      );
    }),
    mapStyle(['isFocused'], isFocused => ({
      div: [['filter', 'width', 'height', 'maxWidth', 'maxHeight']],
      label: [
        ['mergeKeys', { active: isFocused }],
        ['merge', { cursor: 'text' }],
      ],
    })),
  )(
    ({
      text,
      onTextChange,
      icon,
      placeholder,
      rows,
      password,
      tab,
      spellCheck,
      onMouseDown,
      hoverProps,
      focusProps,
      setFocusElem,
      style,
    }) =>
      <div onMouseDown={onMouseDown} {...hoverProps} style={style.div}>
        <Label
          text={text}
          onTextChange={onTextChange}
          icon={icon}
          placeholder={placeholder}
          rows={rows}
          password={password}
          tab={tab}
          spellCheck={spellCheck}
          focusProps={focusProps}
          setFocusElem={setFocusElem}
          style={style.label}
        />
      </div>,
  ) as React.ComponentClass<any>;
}
