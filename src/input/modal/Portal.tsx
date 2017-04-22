import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Portal extends React.Component<{ isOpen: boolean }, {}> {

  private portal: Element | null = null;
  private node: Element | null = null;

  public componentDidMount() {
    if (this.props.isOpen) this.openPortal();
  }

  public componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) this.openPortal(nextProps);
    else if (this.props.isOpen && nextProps.isOpen) this.renderPortal(nextProps);
    else if (this.props.isOpen && !nextProps.isOpen) this.closePortal();
  }

  public componentWillUnmount() {
    this.closePortal();
  }

  private openPortal = (props = this.props) => {
    this.setState({ active: true });
    this.renderPortal(props);
  }

  private renderPortal = (props) => {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }
    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      props.children,
      this.node,
    );
  }

  private closePortal = () => {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.portal = null;
    this.node = null;
  }

  public render() {
    return null;
  }
}
