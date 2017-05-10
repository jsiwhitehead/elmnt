import * as React from 'react';
import { branch, compose, createEventHandler, mapPropsStream, withProps } from 'recompose';
import * as most from 'most';
import { mapStyle } from 'highstyle';
import { Comp, focusOnMouse, Obj } from 'mishmash';

import parsers from './parsers';

export default function createText({ Label }: Obj<Comp>) {
  return compose<any, any>(

    focusOnMouse,

    mapPropsStream(plainProps$ => {
      const props$ = most.from<any>(plainProps$ as any);

      let config = {};
      const state: { props: any, text: string } = { props: {}, text: '' };

      const { handler: textHandler, stream: plainText$ } = createEventHandler();
      const text$ = most.from<string>(plainText$ as any);

      let lastText = '';
      const onTextChange = (text) => {

        const { type, value, onChange } = state.props;

        const parsed = text ? parsers[type].parse(text, state.props) : { value: null };
        config = parsed.config || {};
        lastText = parsed.text !== undefined ? parsed.text : text;

        if (!parsers[type].equals(value, parsed.value)) onChange(parsed.value);
        else textHandler(lastText);
      }

      props$.observe(props => {
        if (props.value !== state.props.value) {
          if (props.value === null && parsers[props.type].parse(lastText, props).value === null) {
            textHandler(lastText);
          } else {
            textHandler(parsers[props.type].format(props.value, config, props));
          }
        }
        state.props = props;
      });
      text$.observe(text => state.text = text);

      return props$.combine((props, text) => ({
        ...props,
        text,
        onTextChange,
        isNull: text ? (props.value === null) : null,
      }), text$.startWith(''));

    }),

    branch(
      ({ password }) => password,
      withProps(() => ({
        icon: ['', 'lock'],
      })),
    ),

    branch(
      ({ type }) => type === 'date',
      withProps(({ isNull, placeholder, noDay }) => ({
        placeholder: placeholder || (noDay ? 'MM/YY' : 'DD/MM/YY'),
        icon: (isNull !== null) && ['', isNull ? 'cross' : 'tick'],
      })),
    ),

    mapStyle(['isFocused'], (isFocused) => ({
      div: [
        ['filter', 'width', 'height', 'maxWidth', 'maxHeight'],
      ],
      label: [
        ['mergeKeys', { active: isFocused }],
        ['merge', { cursor: 'text' }],
      ],
    })),

  )(({
    text, onTextChange, icon, placeholder, rows, password, tab, spellCheck,
    onMouseDown, hoverProps, focusProps, setFocusElem, style
  }) =>
    <div onMouseDown={onMouseDown} {...hoverProps} style={style.div}>
      <Label
        text={text} onTextChange={onTextChange} icon={icon} placeholder={placeholder}
        rows={rows} password={password} tab={tab} spellCheck={spellCheck}
        focusProps={focusProps} setFocusElem={setFocusElem} style={style.label}
      />
    </div>
  );
}
