import { enclose, HOC, methodWrap } from 'mishmash';

export default enclose(() => props => {
  const { value, label, options: { on, off = null }, onChange } = props;
  const selectIndex = () => onChange(value === on ? off : on);
  const methods = methodWrap();
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
