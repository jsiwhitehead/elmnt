import * as React from 'react';
import m, { yieldLifted } from 'mishmash';
import st from 'style-transform';

import css from '../../css';
import Div from '../../div';
import Txt from '../../txt';

import Label from '../components/Label';
import Modal from '../components/Modal';

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

export default m
  .doIf(({ options }) => Array.isArray(options), withSelect, withToggle)
  .merge('style', style => ({
    style: {
      base: style,
      group: st(style)
        .mergeKeys('group')
        .filter(
          ...css.groups.text,
          'paddingTop',
          'paddingBottom',
          ...(style.layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []),
        )
        .merge({ width: '100%', ...userSelect }),
      keyCell: st(style)
        .mergeKeys('key')
        .scale({ paddingRight: { fontSize: 1 } })
        .filter('padding', 'width')
        .merge({ verticalAlign: 'middle' }),
      keyText: st(style)
        .mergeKeys('key')
        .filter(...css.groups.text),
    },
  }))
  .yield(
    'items',
    m
      .merge('style', style => ({
        style: {
          ...style,
          div: st(style.base)
            .filter(
              ...(style.base.layout !== 'modal'
                ? css.groups.other
                : ['maxWidth', 'maxHeight']),
            )
            .mergeKeys(...(style.base.layout === 'table' ? ['row'] : []))
            .merge({ outline: 'none' }),
        },
      }))
      .yield(
        ({
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
              onMouseDown: e => e.preventDefault(),
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
      .do(
        yieldLifted(
          'liftBounds',
          'setBaseElem',
          ({
            closeModal,
            onMouseDown,
            hoverProps,
            setScrollElem,
            style,
            items,
            liftBounds,
          }) => (
            <Modal
              closeModal={closeModal}
              modalProps={{ onMouseDown, ...hoverProps, ref: setScrollElem }}
              baseBounds={liftBounds}
              style={style.base}
              children={items()}
            />
          ),
          ({ isOpen }) => isOpen,
        ),
      )
      .merge('style', 'isFocused', (style, isFocused) => ({
        style: st(style.base)
          .merge(userSelect)
          .mergeKeys({ active: isFocused }),
      }))(
      ({
        value,
        isList,
        labelText,
        openModal,
        setBaseElem,
        placeholder,
        style,
      }) => (
        <div onMouseDown={openModal}>
          <Label
            text={value && labelText}
            iconRight={isList ? 'updown' : 'down'}
            placeholder={placeholder || labelText}
            setBaseElem={setBaseElem}
            style={style}
          />
        </div>
      ),
    ),
  )(
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
        ? [Div, { style: st(style.base).filter('layout', 'spacing') }]
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
