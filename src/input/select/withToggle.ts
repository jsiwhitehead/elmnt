import { HOC, mapPropsStream } from 'mishmash';

export default mapPropsStream(
  props$ =>
    props$.map(props => {
      const { value, label, options: { on, off = null }, onChange } = props;

      const selectIndex = () => onChange(value === on ? off : on);

      return {
        ...props,

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
    }),
  true,
) as HOC;
