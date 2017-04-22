import { ComponentEnhancer, compose, withHandlers, withProps } from 'recompose';

export default compose(

  withHandlers({
    selectIndex: ({ value, options: { on = true, off = null }, onChange }) => (
      () => onChange(value === on ? off : on)
    ),
  }),

  withHandlers({
    onKeyDown: ({ selectIndex }) => (event) => {
      if ((event.keyCode === 13) || (event.keyCode === 32)) {
        selectIndex(0);
        event.preventDefault();
      }
    },
  }),

  withProps(({ value, text, options: { on = true } }) => ({
    activeIndex: 0,
    selected: { 0: value === on },
    isList: true,
    labels: [text],
    labelIndices: [0],
  })),

) as ComponentEnhancer<any, any>;
