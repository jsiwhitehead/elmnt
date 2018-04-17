import * as React from 'react';
import r from 'refluent';

import css from '../../css';
import Div from '../../div';
import Modal from '../../modal';
import Txt from '../../txt';
import { restyle } from '../../utils';

import Label from '../components/Label';

import Item from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

const userSelect = {
  userSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitUserSelect: 'none',
};

export default r
  .yield(props =>
    (Array.isArray(props.options) ? withSelect : withToggle)(props),
  )
  .do(
    restyle(style => ({
      base: style,
      group: style
        .mergeKeys('group')
        .filter(
          ...css.groups.text,
          'paddingTop',
          'paddingBottom',
          ...(style.layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []),
        )
        .merge({ width: '100%', ...userSelect }),
      keyCell: style
        .mergeKeys('key')
        .scale({ paddingRight: { fontSize: 1 } })
        .filter('padding', 'width')
        .merge({ verticalAlign: 'middle' }),
      keyText: style.mergeKeys('key').filter(...css.groups.text),
    })),
  )
  .yield(
    r
      .do('next', next => ({ items: next }))
      .do(
        restyle(style => ({
          ...style,
          div: style.base
            .filter(
              ...(style.base.layout !== 'modal'
                ? css.groups.other
                : ['maxWidth', 'maxHeight']),
            )
            .mergeKeys(...(style.base.layout === 'table' ? ['row'] : []))
            .merge({ outline: 'none' }),
        })),
      )
      .yield(
        ({
          onMouseDown,
          onKeyDown,
          hoverProps,
          focusProps,
          setFocusElem,
          style,
          items,
          next,
        }) =>
          React.createElement(
            style.base.layout === 'table' ? 'tr' : 'div',
            {
              onMouseDown,
              onKeyDown,
              ...hoverProps,
              ...focusProps,
              ref: setFocusElem,
              style: style.div,
              className: 'e5 e6 e7 e8 e9',
            },
            style.base.layout === 'modal' ? next() : items(),
          ),
      )
      .yield(
        ({
          isOpen,
          closeModal,
          onMouseDown,
          hoverProps,
          setScrollElem,
          style,
          items,
          next,
        }) => (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            getBase={base => ({
              ...base,
              width: Math.max(base.width, style.base.fontSize * 20),
            })}
            modalProps={{ onMouseDown, ...hoverProps, ref: setScrollElem }}
            style={style.base}
            next={next}
          >
            {items()}
          </Modal>
        ),
      )
      .do(
        restyle('isFocused', (isFocused, style) =>
          style.base.merge(userSelect).mergeKeys({ active: isFocused }),
        ),
      )
      .yield(
        ({
          value,
          isList,
          labelText,
          openModal,
          setModalBase,
          placeholder,
          style,
        }) => (
          <div onMouseDown={openModal}>
            <Label
              text={value && labelText}
              iconRight={isList ? 'updown' : 'down'}
              placeholder={placeholder || labelText}
              setBaseElem={setModalBase}
              style={style}
            />
          </div>
        ),
      ),
  )
  .yield(
    ({
      isList,
      text,
      selectIndex,
      options,
      labels,
      labelIndices,
      selected,
      activeIndex,
      moveActiveIndex,
      style,
    }) =>
      (React.createElement as any)(
        ...(style.base.layout !== 'table' && style.base.layout !== 'modal'
          ? [Div, { style: style.base.filter('layout', 'spacing') }]
          : [React.Fragment, null]),
        ...(style.base.layout === 'table'
          ? [
              <td style={style.keyCell} key={-1}>
                <Txt style={style.keyText}>{text}</Txt>
              </td>,
            ]
          : []),
        ...labels.map(
          (l, i) =>
            isGroup(l) ? (
              <Txt style={style.group} key={i}>
                {l.substring(1)}
              </Txt>
            ) : (
              <Item
                text={l}
                isList={isList}
                index={labelIndices[i]}
                selectIndex={selectIndex}
                isSelected={
                  isList
                    ? selected[labelIndices[i]]
                    : selected === labelIndices[i]
                }
                isActive={activeIndex === labelIndices[i]}
                isNone={Array.isArray(options) && !options[labelIndices[i]]}
                moveActiveIndex={moveActiveIndex}
                style={style.base}
                key={i}
              />
            ),
        ),
      ),
  );
