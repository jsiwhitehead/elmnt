import { ComponentEnhancer, withHandlers } from 'recompose';

export default withHandlers({
  onMouseDown: ({ onMouseDown, focusElem }) => (event) => {
    if (onMouseDown) onMouseDown(event);
    if (event.target !== focusElem) {
      focusElem.focus();
      event.preventDefault();
    }
  },
}) as ComponentEnhancer<any, any>;
