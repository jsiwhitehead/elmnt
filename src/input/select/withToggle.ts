import m, { HOC } from 'mishmash';

export default m.merge(
  'value',
  'label',
  'options',
  'onChange',
  (value, label, { on, off = null }, onChange) => {
    const selectIndex = () => onChange(value === on ? off : on);
    return {
      activeIndex: 0,
      selected: { 0: value === on },
      isList: true,
      labels: [label],
      labelIndices: [0],
      selectIndex,
      onKeyDown: event => {
        if (event.keyCode === 13 || event.keyCode === 32) {
          selectIndex();
          event.preventDefault();
        }
      },
    };
  },
) as HOC;
