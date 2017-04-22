import { compose, mapProps, withHandlers, withState } from 'recompose';
import * as omit from 'lodash.omit';

import { Comp } from '../../typings';

export interface HoverProps {
  isHovered: boolean;
  hoverProps: {
    onMouseMove: (event: any) => void;
    onMouseLeave: (event: any) => void;
  };
}
export interface HoverOuterProps {
  onMouseMove?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
}
export default function withHover<P>(InnerComponent: Comp<P & HoverProps>) {
  return compose<P & HoverProps, P & HoverOuterProps>(
    withState('isHovered', 'setIsHovered', false),
    withHandlers({
      onMouseMove: ({ isHovered, setIsHovered, onMouseMove }) => ({ event }) => {
        if (!isHovered) setIsHovered(true);
        if (onMouseMove) onMouseMove(event);
      },
      onMouseLeave: ({ isHovered, setIsHovered, onMouseLeave }) => ({ event }) => {
        if (isHovered) setIsHovered(false);
        if (onMouseLeave) onMouseLeave(event);
      },
    }),
    mapProps(props => omit(props, 'setIsHovered')),
    mapProps(({ onMouseMove, onMouseLeave, setIsHovered: _, ...props }) => ({
      ...props,
      hoverProps: { onMouseMove, onMouseLeave },
    })),
  )(InnerComponent);
}
