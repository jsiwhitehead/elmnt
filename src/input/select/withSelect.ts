import r from 'refluent';

const undefToNull = v => (v === undefined ? null : v);

const mod = (a: number, b: number) => ((a % b) + b) % b;
const modMove = (start: number, delta: number, max: number) => {
  if (start >= 0) return mod(start + delta, max);
  return mod(delta > 0 ? delta - 1 : delta, max);
};

const isDate = v => Object.prototype.toString.call(v) === '[object Date]';

const getIndex = (options, value) => {
  if (!isDate(value)) return options.indexOf(value);
  return options.map(o => o && o.getTime()).indexOf(value.getTime());
};

export default r
  .do((props$, push) => {
    const isOpening = { value: false, timeout: null as NodeJS.Timer | null };

    let isScrolling = false;
    let scrollElem: any = null;

    const setIsOpen = isOpen => {
      if (isOpen) props$().onMouseDown();
      isOpening.value = isOpen;
      if (!isOpen) clearTimeout(isOpening.timeout!);
      isOpening.timeout = isOpen
        ? setTimeout(() => (isOpening.value = false), 400)
        : null;
      push({ isOpen });
    };

    const setScrollElem = elem => {
      const { isList, value, options, style } = props$();
      scrollElem = elem;
      if (isList ? value && value.length > 0 : value) {
        const index = getIndex(options, isList ? value[0] : value);
        push({ activeIndex: index });
        scrollToIndex(index, parseFloat(style.fontSize) * 0.5);
      }
    };

    const scrollToIndex = (index, padding) => {
      if (scrollElem) {
        if (!scrollElem.offsetHeight) {
          setTimeout(() => scrollToIndex(index, padding));
        } else {
          const item = scrollElem.querySelector(
            `[data-modal-index="${index}"]`,
          ) as HTMLElement;
          const top = item.offsetTop - padding;
          const bottom = top + item.offsetHeight + padding * 2;
          if (top < scrollElem.scrollTop) {
            scrollElem.scrollTop = top;
          }
          if (bottom > scrollElem.scrollTop + scrollElem.offsetHeight) {
            scrollElem.scrollTop = bottom - scrollElem.offsetHeight;
          }
        }
      }
    };

    const selectIndex = index => {
      const { isList, value, onChange, options } = props$();

      if (!isOpening.value) {
        push({ activeIndex: index });
        if (!isList) {
          onChange(undefToNull(options[index]));
        } else {
          const newValue = options.filter(
            (o, i) =>
              i === index
                ? getIndex(value || [], o) === -1
                : getIndex(value || [], o) !== -1,
          );
          onChange(newValue.length > 0 ? newValue : null);
        }
        if (!isList) setIsOpen(false);
      }
    };

    const moveActiveIndex = (move?: number, jumpTo?: boolean) => {
      const { isList, options, style } = props$();
      const { activeIndex } = props$(true);

      if (move === undefined) {
        selectIndex(activeIndex);
      } else {
        if (isScrolling && jumpTo) {
          isScrolling = false;
        } else {
          const newActiveIndex = jumpTo
            ? move
            : modMove(activeIndex, move, options.length);
          if (!isList && style.layout !== 'modal') selectIndex(newActiveIndex);
          else push({ activeIndex: newActiveIndex });
          if (style.layout === 'modal') isScrolling = true;
          scrollToIndex(newActiveIndex, parseFloat(style.fontSize) * 0.5);
        }
      }
    };

    const onKeyDown = event => {
      const { isList, style } = props$();
      const { isOpen } = props$(true);

      if (style.layout === 'modal' && !isOpen) {
        if (event.keyCode === 13 || event.keyCode === 32) {
          setIsOpen(true);
          event.preventDefault();
        }
      } else {
        if (event.keyCode === 13 || event.keyCode === 32) {
          moveActiveIndex();
          if (!isList) setIsOpen(false);
          event.preventDefault();
        } else if (event.keyCode === 37 || event.keyCode === 38) {
          moveActiveIndex(-1);
          event.preventDefault();
        } else if (event.keyCode === 39 || event.keyCode === 40) {
          moveActiveIndex(1);
          event.preventDefault();
        } else if (event.keyCode === 9 || event.keyCode === 27) {
          setIsOpen(false);
        }
      }
      if (event.keyCode === 13) {
        event.stopPropagation();
      }
    };

    return {
      activeIndex: 0,
      isOpen: false,
      selectIndex,
      moveActiveIndex,
      onKeyDown,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
      setScrollElem,
    };
  })
  .do(
    'isList',
    'value',
    'options',
    'labels',
    (isList, value, options, labels) => {
      const newLabels = (labels || options || []).map(
        o => (o === null ? '-- None --' : o.toString()),
      ) as string[];
      const labelIndices: number[] = [];
      let labelIndex = 0;
      const filteredLabels = newLabels.filter(l => {
        const group = typeof l === 'string' && l[0] === '~';
        labelIndices.push(group ? -1 : labelIndex);
        if (!group) labelIndex++;
        return !group;
      });
      return {
        labels: newLabels,
        labelIndices,
        labelText: !isList
          ? filteredLabels[getIndex(options, value)] || ''
          : filteredLabels
              .filter((_, i) => getIndex(value || [], options[i]) !== -1)
              .join(', '),
        selected: !isList
          ? getIndex(options, value)
          : (value || []).reduce(
              (result, v) => ({ ...result, [getIndex(options, v)]: true }),
              {},
            ),
      };
    },
  );
