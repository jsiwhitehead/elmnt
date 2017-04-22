import { ComponentEnhancer, compose, defaultProps, withHandlers, withProps } from 'recompose';

import { withContext } from '../../utils';

export default compose(

  defaultProps({ onValue: true, offValue: null }),

  withHandlers({
    selectIndex: ({ value, onValue, offValue, onChange }) => (
      () => onChange(value === onValue ? offValue : onValue)
    ),
  }),

  withContext('activeIndex', () => 0),
  withContext('selected', ({ value, onValue }) => ({ 0: value === onValue })),

  withProps(props => console.log(props)),

  withHandlers({
    onKeyDown: ({ selectIndex }) => (event) => {
      if ((event.keyCode === 13) || (event.keyCode === 32)) {
        selectIndex(0);
        event.preventDefault();
      }
    },
  }),

  withProps(({ text }) => ({
    isList: true,
    labels: [text],
    labelIndices: [0],
  })),

) as ComponentEnhancer<any, any>;
