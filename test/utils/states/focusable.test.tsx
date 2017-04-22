import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import focusable, { FocusableProps } from '../../../src/utils/states/focusable';

describe('utils: focusable', () => {

  it('basic', () => {

    const Comp = focusable<{ style: React.CSSProperties }>(({ setFocusElem, style }) =>
      <div tabIndex={0} ref={setFocusElem} style={style} />
    );

    const tree = renderer.create(<Comp style={{ color: 'red' }} />).toJSON();
    expect(tree).toMatchSnapshot();

    const wrapper = mount(<Comp style={{ color: 'red' }} />);
    (wrapper.instance() as any).focus();
    expect(wrapper.find('div').get(0)).toBe(document.activeElement);

    document.body.focus();

  });

  it('focus before elem ready', () => {

    const Comp = focusable<{ show?: boolean }>(({ setFocusElem, show }) =>
      show ? <div tabIndex={0} ref={setFocusElem} /> : null
    );

    const wrapper = mount(<Comp />);
    (wrapper.instance() as any).focus();
    expect(wrapper.find('div').get(0)).toBeUndefined();
    wrapper.setProps({ show: true });
    expect(wrapper.find('div').get(0)).toBe(document.activeElement);

    document.body.focus();

  });

  it('focus on mount', () => {

    const Comp = focusable<{}>(class Inner extends React.Component<FocusableProps, {}> {
      public componentDidUpdate(prevProps) {
        if (this.props.focusElem && !prevProps.focusElem) {
          this.props.focusElem.focus();
        }
      }
      public render() {
        return <div tabIndex={0} ref={this.props.setFocusElem} />;
      }
    });

    const wrapper = mount(<Comp />);
    expect(wrapper.find('div').get(0)).toBe(document.activeElement);

    document.body.focus();

  });

});
