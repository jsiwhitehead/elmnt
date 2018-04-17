import * as React from 'react';

export default (setElemName: string, focusName?: string) => C =>
  class Focusable extends React.Component<any> {
    focusElem = null as null | HTMLElement;
    focusWait = false;
    setFocusElem = elem => {
      this.focusElem = elem;
      if (this.focusElem && this.focusWait) {
        this.focusElem.focus();
        this.focusWait = false;
      }
      if (this.props[setElemName]) this.props[setElemName](elem);
    };
    doFocus = event => {
      if (this.focusElem && (event && event.target) !== this.focusElem) {
        this.focusElem.focus();
        event && event.preventDefault();
      }
      if (this.props[focusName!]) this.props[focusName!](event);
    };
    focus = () =>
      this.focusElem ? this.focusElem.focus() : (this.focusWait = true);
    blur = () => this.focusElem && this.focusElem.blur();
    render() {
      return React.createElement(C, {
        ...this.props,
        [setElemName]: this.setFocusElem,
        ...(focusName ? { [focusName]: this.doFocus } : {}),
      });
    }
  } as React.ComponentClass<any>;
