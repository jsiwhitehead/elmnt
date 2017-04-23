import { ComponentEnhancer, compose, lifecycle, withProps } from 'recompose';

import { getContext } from '../context';

export default function renderPortal(mapPropsToContent: (props: any) => React.ReactNode | null) {
  return compose(

    getContext('portal'),

    lifecycle({
      componentDidMount() {
        this.props.portal.render(mapPropsToContent(this.props));
      },
      componentWillReceiveProps(nextProps) {
        nextProps.portal.render(mapPropsToContent(nextProps));
      },
      componentWillUnmount() {
        this.props.portal.render(null);
      }
    }),

    withProps(({ portal }) => ({
      setPortalBaseElem: portal.setBaseElem,
    })),

  ) as ComponentEnhancer<any, any>;
}
