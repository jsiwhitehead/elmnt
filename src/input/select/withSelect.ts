import * as most from 'most';
import { HOC, mapPropsStream, streamState } from 'mishmash';

const undefToNull = (v: any) => v === undefined ? null : v;

const mod = (a: number, b: number) => ((a % b) + b) % b;
const modMove = (start: number, delta: number, max: number) => {
  if (start >= 0) return mod(start + delta, max);
  return mod(delta > 0 ? delta - 1 : delta, max);
};

export default mapPropsStream(props$ => {

  const { state$: activeIndex$, setState: setActiveIndex } = streamState(0);

  const { state$: isOpen$, setState: setIsOpen } = streamState(false);
  const isOpening = { value: false, timeout: null as number | null };
  isOpen$.observe(isOpen => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    isOpening.value = isOpen;
    if (!isOpen) clearTimeout(isOpening.timeout!);
    isOpening.timeout = isOpen ? setTimeout(() => isOpening.value = false, 400) : null;
  });

  let isScrolling = false;
  let scrollElem: any = null;
  const { state$: noScrollRefBase$, setState: setNoScrollRef } =
    streamState<boolean>(undefined, false);
  const noScrollRef$ = noScrollRefBase$.chain(() => most.from([true, false])).startWith(false);

  const scrollToIndex = (index, padding) => {
    if (scrollElem) {
      if (!scrollElem.offsetHeight) {
        setNoScrollRef(true);
      } else {
        const item =
          scrollElem.querySelector(`[data-modal-index="${index}"]`) as HTMLElement;
        const top = item.offsetTop - padding;
        const bottom = top + item.offsetHeight + (padding * 2);
        if (top < scrollElem.scrollTop) {
          scrollElem.scrollTop = top;
        }
        if (bottom > scrollElem.scrollTop + scrollElem.offsetHeight) {
          scrollElem.scrollTop = (bottom - scrollElem.offsetHeight);
        }
      }
    }
  }

  return props$.combine((props, activeIndex, isOpen, noScrollRef) => {

    const { isList, value, onChange, options, labels, style: { fontSize, layout } } = props;

    const selectIndex = (index) => {
      if (!isOpening.value) {
        setActiveIndex(index);
        if (!isList) {
          onChange(undefToNull(options[index]));
        } else {
          const newValue = options.filter((o, i) => (
            i === index ? !(value || []).includes(o) : (value || []).includes(o)
          ));
          onChange(newValue.length > 0 ? newValue : null);
        }
        if (!isList) setIsOpen(false);
      }
    };

    const moveActiveIndex = (move?: number, jumpTo?: boolean) => {
      if (move === undefined) {
        selectIndex(activeIndex);
      } else {
        if (isScrolling && jumpTo) {
          isScrolling = false;
        } else {
          const newActiveIndex = jumpTo ? move : modMove(activeIndex, move, options.length);
          (isList || (layout === 'modal') ? setActiveIndex : selectIndex)(newActiveIndex);
          if (layout === 'modal') isScrolling = true;
          scrollToIndex(newActiveIndex, parseFloat(fontSize) * 0.5);
        }
      }
    };

    const onKeyDown = (event) => {
      if (layout === 'modal' && !isOpen) {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          setIsOpen(true);
          event.preventDefault();
        }
      } else {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          moveActiveIndex();
          if (!isList) setIsOpen(false);
          event.preventDefault();
        } else if ((event.keyCode === 37) || (event.keyCode === 38)) {
          moveActiveIndex(-1);
          event.preventDefault();
        } else if ((event.keyCode === 39) || (event.keyCode === 40)) {
          moveActiveIndex(1);
          event.preventDefault();
        } else if ((event.keyCode === 9) || (event.keyCode === 27)) {
          setIsOpen(false);
        }
      }
      if (event.keyCode === 13) {
        event.stopPropagation();
      }
    };

    const newLabels = (labels || options || []).map(o => o.toString()) as string[];
    const filteredLabels = newLabels.filter(l => !(typeof l === 'string' && l[0] === '~'));
    const labelIndices = newLabels.map(l => filteredLabels.indexOf(l));

    return {

      ...props,

      activeIndex,
      labels: newLabels,
      labelIndices,
      labelText: !isList ? filteredLabels[options.indexOf(value)] || '' :
        filteredLabels.filter((_, i) => (value || []).includes(options[i])).join(', '),
      selected: !isList ? options.indexOf(value) :
        (value || []).reduce((result, v) => ({ ...result, [options.indexOf(v)]: true }), {}),

      selectIndex,
      moveActiveIndex,
      onKeyDown,

      ...(layout === 'modal' ? {
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        setScrollElem: (elem) => {
          scrollElem = elem;
          if (value) {
            const index = options.indexOf(isList ? value[0] : value);
            setActiveIndex(index);
            scrollToIndex(index, parseFloat(fontSize) * 0.5);
          }
        },
        ...(noScrollRef ? { setScrollElem: null } : {})
      } : {}),

    };

  }, activeIndex$, isOpen$, noScrollRef$);

}, true) as HOC;
