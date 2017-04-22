import { branch, ComponentEnhancer, compose, withHandlers, withProps } from 'recompose';

import { getContext } from '../../utils';

export default compose(

  branch(
    ({ modal }) => modal,
    withHandlers({
      onMouseUp: ({ index, selectIndex }) => () => selectIndex(index),
      onMouseMove: ({ index, moveActiveIndex }) => () => moveActiveIndex(index, true),
    }),
    withHandlers({
      onMouseDown: ({ index, selectIndex }) => () => selectIndex(index),
    }),
  ),

  getContext('selected'),
  getContext('activeIndex'),

  withProps(({ isList, index, selected, activeIndex, modal }) => ({
    icon: (isList ? selected[index]: (selected === index)) && (isList || modal ? 'tick' : 'disc'),
    isActive: index === activeIndex,
  })),

) as ComponentEnhancer<any, any>;
