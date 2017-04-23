import { compose, mapProps, withHandlers, withState } from 'recompose';

import { Comp } from '../../typings';

export interface FocusProps {
  isFocused: boolean;
  focusProps: {
    tabIndex: number;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
  };
}
export interface FocusOuterProps {
  tabIndex?: number;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}
export default function withFocus<P>(InnerComponent: Comp<P & FocusProps>) {
  return compose<P & FocusProps, P & FocusOuterProps>(
    withState('isFocused', 'setIsFocused', false),
    withHandlers({
      onFocus: ({ setIsFocused, onFocus }) => (event) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
      },
      onBlur: ({ setIsFocused, onBlur }) => (event) => {
        setIsFocused(false);
        if (onBlur) onBlur(event);
      },
    }),
    mapProps(({ tabIndex = 0, onFocus, onBlur, setIsFocused: _, ...props }) => ({
      ...props,
      focusProps: { tabIndex, onFocus, onBlur },
    })),
  )(InnerComponent);
}
