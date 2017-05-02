import { ComponentEnhancer, compose, lifecycle, withProps } from 'recompose';

import { getContext } from '../context';

export default function renderPortal(mapPropsToContent: (props: any) => React.ReactNode | null) {
  return compose(

    getContext('portal'),

    withProps((props: any) => {
      const portalContent = mapPropsToContent(props);
      return { portalContent, setPortalBaseElem: portalContent && props.portal.setBaseElem };
    }),

    lifecycle({
      componentDidMount() {
        (this as any).props.portal.render((this as any).props.portalContent);
      },
      componentWillReceiveProps(nextProps) {
        nextProps.portal.render(nextProps.portalContent);
      },
      componentWillUnmount() {
        (this as any).props.portal.render(null);
      }
    }),

  ) as ComponentEnhancer<any, any>;
}
