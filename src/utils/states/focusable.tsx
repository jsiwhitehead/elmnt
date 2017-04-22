import * as React from 'react';

import { Comp } from '../../typings';

export interface FocusableProps {
  focusElem: any;
  setFocusElem: (c: any) => void;
}
export interface FocusableOuterProps {
  focusRef?: (c: any) => void;
}
interface FocusableState {
  focusElem: HTMLElement | null;
  focusWait: boolean;
}

export default function focusable<P extends FocusableOuterProps>(
  InnerComponent: Comp<P & FocusableProps>,
) {
  return class Focusable extends React.Component<P, FocusableState> {

    public state = { focusElem: null, focusWait: false } as FocusableState;

    private setFocusElem = c => {
      this.setState({ focusElem: c });
      if (this.props.focusRef) (this.props.focusRef as any)(c);
    }

    public focus = () => (
      this.state.focusElem ? this.state.focusElem.focus() : this.setState({ focusWait: true })
    );

    public isFocusElem = (elem: any) => elem === this.state.focusElem;

    public componentDidUpdate() {
      if (this.state.focusElem && this.state.focusWait) {
        this.state.focusElem.focus();
        this.setState({ focusWait: false });
      }
    }

    public render() {
      return (
        <InnerComponent
          {...this.props} focusElem={this.state.focusElem} setFocusElem={this.setFocusElem}
        />
      );
    }
  } as React.ComponentClass<P>;
}
