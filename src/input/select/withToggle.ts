import m, { HOC } from 'mishmash';

export default m().enhance(({ methods }) => props => {
  const { value, label, options: { on, off = null }, onChange } = props;
  const selectIndex = () => onChange(value === on ? off : on);
  return {
    ...props,
    activeIndex: 0,
    selected: { 0: value === on },
    isList: true,
    labels: [label],
    labelIndices: [0],
    ...methods({
      selectIndex,
      onKeyDown: event => {
        if (event.keyCode === 13 || event.keyCode === 32) {
          selectIndex();
          event.preventDefault();
        }
      },
    }),
  };
}) as HOC;
