import * as React from 'react';
import { branch, compose, renderComponent, withProps } from 'recompose';
import { mapStyle } from 'highstyle';

import { Comp, Obj } from '../../typings';
import { clickFocus, renderLayer, renderPortal } from '../../utils';

import createItem from './Item';
import withSelect from './withSelect';
import withToggle from './withToggle';

const isGroup = l => typeof l === 'string' && l[0] === '~';

class ScrollWrapper extends React.Component<any, any> {
  private elem: Element;
  private setElem = c => this.elem = c;
  public scrollToIndex = (index) => {
    if (this.elem) {
      const modal = this.elem.querySelector('[data-modal]') as HTMLElement
      const item = this.elem.querySelector(`[data-modal-index="${index}"]`) as HTMLElement;
      const top = item.offsetTop;
      const bottom = top + item.offsetHeight;
      if (top < modal.scrollTop) {
        modal.scrollTop = top;
      }
      if (bottom > modal.scrollTop + modal.offsetHeight) {
        modal.scrollTop = (bottom - modal.offsetHeight);
      }
    }
  }
  public render() {
    return <div ref={this.setElem}>{this.props.children}</div>;
  }
}

export default function createSelect({ Group, Key, Label, Modal, Option, Select }: Obj<Comp<any>>) {
  const Item = createItem({ Option });
  return compose<any, any>(

    branch(
      ({ options }) => Array.isArray(options),
      withSelect,
      withToggle,
    ),

    mapStyle(() => ({
      base: null,
      group: [
        ['mergeKeys', 'group'],
      ],
      key: [
        ['mergeKeys', 'key'],
      ],
    })),

    withProps(({
      text, isList, selectIndex, options, labels, labelIndices, selected,
      activeIndex, moveActiveIndex, style,
    }) => ({
      children: [
        ...(text && Array.isArray(options) ? [<Key text={text} style={style.key} key={-1} />] : []),
        ...labels.map((l, i) => isGroup(l) ?
          <Group style={style.group} key={i}>{l.substring(1)}</Group> :
          <Item
            text={l} isList={isList} index={labelIndices[i]} selectIndex={selectIndex}
            selected={selected} activeIndex={activeIndex} moveActiveIndex={moveActiveIndex}
            style={style.base} key={i}
          />
        ),
      ],
    })),

    branch(
      ({ style: { base: { layout } } }) => layout === 'table',
      renderComponent(({ onKeyDown, hoverProps, focusProps, setFocusElem, children }) =>
        <tr
          onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
          style={{ outline: 'none' }} children={children}
        />
      ),
    ),

    renderLayer(({ onKeyDown, hoverProps, focusProps, setFocusElem, children }) =>
      <div
        onKeyDown={onKeyDown} {...hoverProps} {...focusProps} ref={setFocusElem}
        style={{ outline: 'none' }} children={children}
      />
    ),

    branch(
      ({ style: { base: { layout } } }) => layout !== 'modal',
      renderComponent(({ labels, style, children }) =>
        <Select labels={labels} style={style.base}>{children}</Select>
      ),
    ),

    clickFocus,

    renderPortal(({
      openState, closeModal, onMouseDown, hoverProps, setScrollElem, style, children,
    }) =>
      openState.isOpen && (
        <ScrollWrapper ref={setScrollElem}>
          <Modal
            closeModal={closeModal} modalProps={{ 'data-modal': true, onMouseDown, ...hoverProps }}
            style={style.base} children={children}
          />
        </ScrollWrapper>
      )
    ),

    mapStyle(({ isFocused }) => ({ base: {
      label: [['mergeKeys', { active: isFocused }]],
    } })),

  )(({ isList, labelText, openModal, setPortalBaseElem, style }) =>
    <div onMouseDown={openModal} ref={setPortalBaseElem}>
      <Label text={labelText} icon={['', isList ? 'updown' : 'down']} style={style.label} />
    </div>
  );
}
