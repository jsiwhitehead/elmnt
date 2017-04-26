import * as React from 'react';

export default class ScrollWrapper extends React.Component<any, any> {

  private elem: Element | null = null;
  private setElem = c => this.elem = c;

  private scrollIndex: number | null = null;
  public scrollToIndex = (index) => this.scrollIndex = index;

  private tryScroll = () => {
    if ((this.scrollIndex !== null) && this.elem) {
      const modal = this.elem.querySelector('[data-modal]') as HTMLElement;
      if (modal.offsetHeight) {

        const item =
          this.elem.querySelector(`[data-modal-index="${this.scrollIndex}"]`) as HTMLElement;
        const top = item.offsetTop - (parseFloat(this.props.style.fontSize) * 0.5);
        const bottom = top + item.offsetHeight + parseFloat(this.props.style.fontSize);
        if (top < modal.scrollTop) {
          modal.scrollTop = top;
        }
        if (bottom > modal.scrollTop + modal.offsetHeight) {
          modal.scrollTop = (bottom - modal.offsetHeight);
        }
        this.scrollIndex = null;

      } else {
        this.forceUpdate();
      }
    }
  }

  public componentDidMount() {
    this.tryScroll();
  }
  public componentDidUpdate() {
    this.tryScroll();
  }

  public render() {
    return <div ref={this.setElem}>{this.props.children}</div>;
  }

}
