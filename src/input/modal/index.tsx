import * as React from 'react';
import css from 'highstyle';

import Portal from './Portal';

const padding = 5;
const paddingSmall = [50, 15];
const overflow = document.body.style.overflow;

const toPxString = (x?: number | string): string => {
  if (x === null || x === undefined) return '';
  return typeof x === 'number' ? `${x}px` : x;
}

export interface ModalProps extends React.HTMLProps<{}> {
  isOpen?: boolean;
  baseElement: React.ReactNode;
  footer?: React.ReactNode;
  onClickBase?: () => void;
  onClickOutside?: () => void;
  style: React.CSSProperties;
}
export interface ModalState {
  small: boolean;
  top: number;
  left: number;
  width: number;
  height: number;
  footerHeight: number;
}
export default class Modal extends React.Component<ModalProps, ModalState> {

  private base;
  private modal;
  private inner;

  public state = {
    small: false, top: 0, left: 0, width: 0, height: 0, footerHeight: 0,
  } as ModalState;

  public componentDidMount = () => {
    window.addEventListener('resize', this.fitOnScreen);
    this.fitOnScreen();
    this.updateScrollLock();
  }
  public componentDidUpdate = () => {
    this.fitOnScreen();
    this.updateScrollLock();
  }
  public componentWillUnmount = () => {
    window.removeEventListener('resize', this.fitOnScreen);
  }

  public scrollToIndex = (index) => {
    if (this.inner) {
      const elem = this.inner.querySelector(`[data-modal-index="${index}"]`);
      const top = elem.offsetTop;
      const bottom = top + elem.offsetHeight;
      if (top < this.inner.scrollTop) {
        this.inner.scrollTop = top;
      }
      if (bottom > this.inner.scrollTop + this.inner.offsetHeight) {
        this.inner.scrollTop = (bottom - this.inner.offsetHeight);
      }
    }
  }

  private onMouseDown = (event) => event.preventDefault();

  private updateScrollLock = () => {
    document.body.style.overflow = this.props.isOpen ? 'hidden' : overflow;
  }

  private fitOnScreen = () => {
    if (this.props.isOpen && this.modal) {
      const newState = {} as ModalState;

      const style = css(this.props.style, [['expandFor', 'paddingTop', 'paddingBottom']]);

      const modalClone = this.modal.cloneNode(true);
      modalClone.style.visibility = 'hidden';
      modalClone.style.width = toPxString(style.width) || 'auto';
      modalClone.style.minWidth = toPxString(style.minWidth) || '0';
      modalClone.style.height = 'auto';
      modalClone.style.paddingTop = toPxString(style.paddingTop);
      modalClone.style.paddingBottom = toPxString(style.paddingBottom);

      document.body.appendChild(modalClone);

      modalClone.childNodes[0].style.position = 'relative';
      modalClone.childNodes[0].style.bottom = toPxString(style.paddingBottom);
      newState.footerHeight = this.props.footer ? modalClone.childNodes[1].offsetHeight : 0;

      if (document.documentElement.clientWidth < 500) {
        newState.small = true;

        newState.width = document.documentElement.clientWidth - (paddingSmall[1] * 2);
        modalClone.style.width = toPxString(newState.width);

        newState.height = Math.min(
          modalClone.getBoundingClientRect().height + newState.footerHeight,
          document.documentElement.clientHeight - (paddingSmall[0] * 2),
        );

        newState.left = paddingSmall[1];

        newState.top = document.documentElement.clientHeight * 0.5;
      } else {
        newState.small = false;
        const baseRect = this.base.childNodes[0].getBoundingClientRect();

        newState.width = Math.min(
          Math.max(modalClone.getBoundingClientRect().width, baseRect.width),
          document.documentElement.clientWidth - (padding * 2),
        );
        modalClone.style.width =  toPxString(newState.width);

        newState.height = Math.min(
          modalClone.getBoundingClientRect().height + newState.footerHeight,
          document.documentElement.clientHeight - (padding * 2),
        );

        newState.left = Math.min(
          Math.max(baseRect.left, padding),
          document.documentElement.clientWidth - newState.width - padding,
        );

        newState.top = Math.min(
          Math.max(baseRect.top, padding),
          document.documentElement.clientHeight - newState.height - padding,
        );
      }

      document.body.removeChild(modalClone);

      let stateChanged = false;
      for (const key of Object.keys(newState)) {
        if (newState[key] !== this.state[key]) stateChanged = true;
      }
      if (stateChanged) this.setState(newState);
    }
  }

  private clickOverlay = () => {
    if (this.props.onClickOutside) this.props.onClickOutside();
  }

  public render() {
    const {
      isOpen, baseElement, footer, onClickBase, onClickOutside, style, children, ...otherProps,
    } = this.props as any;

    const s = css(style, [['expandFor', 'paddingTop', 'paddingBottom']]);

    const overlayStyle = {
      position: 'fixed' as 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 100000,
      background: this.state.small ? 'rgba(0,0,0,0.5)' : 'none',
    };
    const modalStyle = {
      boxShadow: this.state.small ? '0 2px 25px rgba(0,0,0,0.5)' : '0 2px 20px 5px rgba(0,0,0,0.4)',
      borderRadius: 3,
      background: 'white',
      ...s,
      padding: 0,
      overflow: 'hidden' as 'hidden',
      position: 'fixed' as 'fixed',
      top: this.state.top, left: this.state.left,
      height: this.state.height, width: this.state.width,
      marginTop: this.state.small ? -(this.state.height * 0.5) : 0,
      minWidth: 0,
      zIndex: 100001,
    };
    const innerStyle = {
      overflow: 'auto' as 'auto',
      position: 'absolute' as 'absolute',
      top: s.paddingTop,
      bottom: parseFloat(s.paddingBottom || '0') + this.state.footerHeight,
      width: '100%',
    };
    const footerStyle = {
      position: 'absolute' as 'absolute',
      left: 0, bottom: 0, width: '100%',
    };

    return (
      <div ref={c => this.base = c}>
        {React.cloneElement(baseElement, {
          onMouseDown: onClickBase, ...(isOpen ? {} : otherProps),
        })}
        <Portal isOpen={isOpen}>
          <div className="kalambo">
            <div style={overlayStyle} onMouseDown={this.clickOverlay} />
            <div
              style={modalStyle} ref={c => this.modal = c} {...(isOpen ? otherProps : {})}
              onMouseDown={this.onMouseDown}
            >
              <div style={innerStyle} ref={c => this.inner = c}>
                {children}
              </div>
              {footer &&
                <div style={footerStyle}>{footer}</div>
              }
            </div>
          </div>
        </Portal>
      </div>
    );
  }
};
