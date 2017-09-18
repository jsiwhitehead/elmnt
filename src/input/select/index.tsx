import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import {
  Comp,
  cssGroups,
  focusOnMouse,
  mapStyle,
  Obj,
  renderLayer,
  renderLifted,
} from 'mishmash';

import createItem from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

export default function createSelect({
  Group,
  Key,
  Label,
  Modal,
  Option,
  Select,
}: Obj<Comp>) {
  const Item = createItem({ Option });
  return compose<any, any>(
    branch(({ options }) => Array.isArray(options), withSelect, withToggle),
    mapStyle({
      base: null,
      group: [
        ['mergeKeys', 'group'],
        ['merge', { width: '100%', userSelect: 'none' }],
      ],
      key: [['mergeKeys', 'key']],
    }),
    withProps(
      ({
        text,
        isList,
        selectIndex,
        options,
        labels,
        labelIndices,
        selected,
        activeIndex,
        moveActiveIndex,
        style,
      }) => ({
        items: [
          ...(style.base.layout === 'table'
            ? [<Key text={text} style={style.key} key={-1} />]
            : []),
          ...labels.map(
            (l, i) =>
              isGroup(l) ? (
                <Group style={style.group} key={i}>
                  {l.substring(1)}
                </Group>
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
        ],
      }),
    ),
    mapStyle(['style.base.layout'], layout => ({
      base: {
        div: [
          ['filter', ...cssGroups.other],
          layout === 'table' && ['mergeKeys', 'row'],
          ['merge', { outline: 'none' }],
        ],
      },
    })),
    branch(
      ({ style }) => style.base.layout === 'table',
      renderComponent(
        ({
          onKeyDown,
          hoverProps,
          focusProps,
          setFocusElem,
          style,
          items,
        }: any) => (
          <tr
            onKeyDown={onKeyDown}
            {...hoverProps}
            {...focusProps}
            ref={setFocusElem}
            style={style.div}
            children={items}
            className="e5 e6 e7 e8 e9"
          />
        ),
      ),
    ),
    renderLayer(
      ({
        onKeyDown,
        hoverProps,
        focusProps,
        setFocusElem,
        style,
        children,
      }) => (
        <div
          onKeyDown={onKeyDown}
          {...hoverProps}
          {...focusProps}
          ref={setFocusElem}
          style={style.div}
          children={children}
          className="e5 e6 e7 e8 e9"
        />
      ),
    ),
    branch(
      ({ style }) => style.base.layout !== 'modal',
      renderComponent(({ labels, style, items }: any) => (
        <Select labels={labels} style={style.base}>
          {items}
        </Select>
      )),
    ),
    focusOnMouse,
    renderLifted(
      ({ isOpen }) => isOpen,
      ({
        closeModal,
        onMouseDown,
        hoverProps,
        setScrollElem,
        style,
        items,
      }) => (
        <Modal
          closeModal={closeModal}
          modalProps={{ onMouseDown, ...hoverProps, ref: setScrollElem }}
          style={style.base}
          children={items}
        />
      ),
    ),
    mapStyle(['isFocused'], isFocused => ({
      base: {
        label: [['mergeKeys', { active: isFocused }]],
      },
    })),
  )(
    ({
      value,
      isList,
      labelText,
      openModal,
      setLiftBaseElem,
      placeholder,
      style,
    }) => (
      <div onMouseDown={openModal} ref={setLiftBaseElem}>
        <Label
          text={value && labelText}
          iconRight={isList ? 'updown' : 'down'}
          placeholder={placeholder || labelText}
          style={style.label}
        />
      </div>
    ),
  );
}
