import { mapPropsStream } from 'mishmash';

export default mapPropsStream<any, any>((props$, handlers) => props$.map(props => {

  const { value, label, options: { on, off = null }, onChange } = props;

  const { selectIndex } = handlers({
    selectIndex: () => onChange(value === on ? off : on),
  });

  const { onKeyDown } = handlers({
    onKeyDown: (event) => {
      if ((event.keyCode === 13) || (event.keyCode === 32)) {
        selectIndex();
        event.preventDefault();
      }
    },
  });

  return {
    ...props,
    activeIndex: 0,
    selected: { 0: value === on },
    isList: true,
    labels: [label],
    labelIndices: [0],
    selectIndex,
    onKeyDown,
  };

}));
