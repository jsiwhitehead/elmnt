import {
  branch, ComponentEnhancer, compose, mapProps, pure, withHandlers, withProps, withState,
} from 'recompose';
import * as omit from 'lodash.omit';

import { memoize } from '../../utils';

const undefToNull = (v: any) => v === undefined ? null : v;

const mod = (a: number, b: number) => ((a % b) + b) % b;
const modMove = (start: number, delta: number, max: number) => {
  if (start >= 0) return mod(start + delta, max);
  return mod(delta > 0 ? delta - 1 : delta, max);
};

const getText = (isList, value, options, labels) => {
  if (!value) return '';
  if (!isList) return labels[options.indexOf(value)] || '';
  return labels.filter((_, i) => (value || []).includes(options[i])).join(', ');
}

const createScrollState = memoize(isScrolling => memoize(scrollElem => ({
  isScrolling, scrollElem,
}), true), true);

export default compose(

  withState('activeIndex', 'setActiveIndex', 0),

  pure,

  withHandlers({
    selectIndex: ({ isList, value, onChange, setActiveIndex, options }) => (index) => {
      setActiveIndex(index);
      if (!isList) {
        onChange(undefToNull(options[index]));
      } else {
        const newValue = options.filter((o, i) => (
          i === index ? !(value || []).includes(o) : (value || []).includes(o)
        ));
        onChange(newValue.length > 0 ? newValue : null);
      }
    },
  }),

  withHandlers({
    moveActiveIndex: ({
      isList, activeIndex, setActiveIndex, selectIndex, options, style: { layout },
    }) => (
      (move?: number, jumpTo?: boolean) => {
        if (move === undefined) {
          selectIndex(activeIndex);
        } else {
          const newActiveIndex = jumpTo ? move : modMove(activeIndex, move, options.length);
          (isList || (layout === 'modal') ? setActiveIndex : selectIndex)(newActiveIndex);
          return newActiveIndex;
        }
      }
    ),
  }),

  branch(
    ({ style }) => style.layout === 'modal',
    compose(

      withState('openState', 'setOpenState', { isOpen: false, isOpening: false, timeout: null }),
      withState('scroll', 'setScroll', createScrollState(false)(null)),

      withHandlers({
        setOpenState: ({ setOpenState }) => (openState) => {
          document.body.style.overflow = openState.isOpen ? 'hidden' : 'auto';
          setOpenState(openState);
        },
      }),

      withHandlers({

        openModal: ({ setOpenState }) => () => {
          const timeout = setTimeout(() => setOpenState({ isOpen: true, isOpening: false }), 400);
          setOpenState({ isOpen: true, isOpening: true, timeout });
        },
        closeModal: ({ openState, setOpenState }) => () => {
          clearTimeout(openState.timeout);
          setOpenState({ isOpen: false, isOpening: false, timeout: null });
        },

        moveActiveIndex: ({ moveActiveIndex, scroll, setScroll }) => (
          (move?: number, jumpTo?: boolean) => {
            if (move === undefined) {
              moveActiveIndex(move, jumpTo);
            } else {
              if (scroll.isScrolling && jumpTo) {
                setScroll(createScrollState(false)(scroll.scrollElem));
              } else {
                const newActiveIndex = moveActiveIndex(move, jumpTo);
                setScroll(createScrollState(true)(scroll.scrollElem));
                if (scroll.scrollElem) scroll.scrollElem.scrollToIndex(newActiveIndex);
              }
            }
          }
        ),

        setScrollElem: ({ setScroll }) => (elem) => (
          setScroll(scroll => createScrollState(scroll.isScrolling)(elem))
        ),

      }),

      mapProps(props => omit(props, 'scroll')),
      pure,

      withHandlers({
        selectIndex: ({ isList, selectIndex, openState, closeModal }) => (i) => {
          if (!openState.isOpening) {
            if (!isList) closeModal();
            selectIndex(i);
          }
        },
      }),

    ),
  ),

  withHandlers({
    onKeyDown: ({ isList, moveActiveIndex, openState, openModal, closeModal }) => (event) => {
      if (openState && !openState.isOpen) {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          openModal();
          event.preventDefault();
        }
      } else {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          moveActiveIndex();
          if (!isList && closeModal) closeModal();
          event.preventDefault();
        } else if ((event.keyCode === 37) || (event.keyCode === 38)) {
          moveActiveIndex(-1);
          event.preventDefault();
        } else if ((event.keyCode === 39) || (event.keyCode === 40)) {
          moveActiveIndex(1);
          event.preventDefault();
        } else if ((event.keyCode === 9) || (event.keyCode === 27)) {
          if (closeModal) closeModal();
        }
      }
      if (event.keyCode === 13) {
        event.stopPropagation();
      }
    },
  }),

  withProps(({ isList, value, options, labels }) => {
    const newLabels = (labels || options || []).map(o => o.toString()) as string[];
    const filteredLabels = newLabels.filter(l => !(typeof l === 'string' && l[0] === '~'));
    const labelIndices = newLabels.map(l => filteredLabels.indexOf(l));
    return {
      labels: newLabels,
      labelIndices,
      labelText: getText(isList, value, options, filteredLabels),
      selected: !isList ? options.indexOf(value) :
        (value || []).reduce((result, v) => ({ ...result, [options.indexOf(v)]: true }), {}),
    };
  }),

) as ComponentEnhancer<any, any>;
