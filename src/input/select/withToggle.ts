import { ComponentEnhancer, compose, withHandlers, withProps } from 'recompose';

export default compose(

  withHandlers({
    selectIndex: ({ value, options: { on, off = null }, onChange }) => (
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

  withProps(({ value, label, options: { on } }) => ({
    activeIndex: 0,
    selected: { 0: value === on },
    isList: true,
    labels: [label],
    labelIndices: [0],
  })),

);
