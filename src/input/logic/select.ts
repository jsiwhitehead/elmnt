import { branch, ComponentEnhancer, compose, withHandlers, withProps, withState } from 'recompose';

import { withContext } from '../../utils';

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

export default compose(

  withState('activeIndex', 'setActiveIndex', 0),
  withContext('activeIndex', ({ activeIndex }) => activeIndex),

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

  withContext(
    'selected',
    ({ isList, value, options }) => !isList ? options.indexOf(value) :
      (value || []).reduce((result, v) => ({ ...result, [options.indexOf(v)]: true }), {}),
  ),

  withHandlers({
    moveActiveIndex: ({ isList, activeIndex, setActiveIndex, selectIndex, options, modal }) => (
      (move?: number, jumpTo?: boolean) => {
        if (move === undefined) {
          selectIndex(activeIndex);
        } else {
          const newActiveIndex = jumpTo ? move : modMove(activeIndex, move, options.length);
          (isList || modal ? setActiveIndex : selectIndex)(newActiveIndex);
          return newActiveIndex;
        }
      }
    ),
  }),

  branch(
    ({ modal }) => modal,
    compose(

      withState('scroll', 'setScroll', { isScrolling: false, modalElem: null }),
      withHandlers({
        setModalElem: ({ scroll, setScroll }) => (c) => setScroll({ ...scroll, modalElem: c }),
      }),

      withHandlers({
        moveActiveIndex: ({ moveActiveIndex, scroll, setScroll }) => (
          (move?: number, jumpTo?: boolean) => {
            if (move === undefined) {
              moveActiveIndex(move, jumpTo);
            } else {
              if (scroll.isScrolling && jumpTo) {
                setScroll({ ...scroll, isScrolling: false });
              } else {
                const newActiveIndex = moveActiveIndex(move, jumpTo);
                setScroll({ ...scroll, isScrolling: true });
                if (scroll.modalElem) scroll.modalElem.scrollToIndex(newActiveIndex);
              }
            }
          }
        ),
      }),

      withState('openState', 'setOpenState', { isOpen: false, isOpening: false, timeout: null }),

      withHandlers({
        open: ({ setOpenState }) => () => {
          const timeout = setTimeout(() => setOpenState({ isOpen: true, isOpening: false }), 400);
          setOpenState({ isOpen: true, isOpening: true, timeout });
        },
        close: ({ openState, setOpenState }) => () => {
          clearTimeout(openState.timeout);
          setOpenState({ isOpen: false, isOpening: false, timeout: null });
        },
      }),

      withHandlers({
        selectIndex: ({ isList, selectIndex, openState, close }) => (i) => {
          if (!openState.isOpening) {
            if (!isList) close();
            selectIndex(i);
          }
        },
      }),

    ),
  ),

  withHandlers({
    onKeyDown: ({ isList, moveActiveIndex, openState, open, close }) => (event) => {
      if (openState && !openState.isOpen) {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          open();
          event.preventDefault();
        }
      } else {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          moveActiveIndex();
          if (!isList && close) close();
          event.preventDefault();
        } else if ((event.keyCode === 37) || (event.keyCode === 38)) {
          moveActiveIndex(-1);
          event.preventDefault();
        } else if ((event.keyCode === 39) || (event.keyCode === 40)) {
          moveActiveIndex(1);
          event.preventDefault();
        } else if ((event.keyCode === 9) || (event.keyCode === 27)) {
          if (close) close();
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
      labels: newLabels, labelIndices,
      text: getText(isList, value, options, filteredLabels),
    };
  }),

) as ComponentEnhancer<any, any>;
