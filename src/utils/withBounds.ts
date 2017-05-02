import { compose, ComponentEnhancer, lifecycle, mapProps, withProps, withState } from 'recompose';
import * as omit from 'lodash.omit';

const screenRect = () => ({
  top: 0, height: window.innerHeight, left: 0, width: window.innerWidth,
});

export default function withBounds(boundsName: string, setBoundsElemName?: string) {
  return compose(

    withState(boundsName, 'setBounds', setBoundsElemName ? undefined : screenRect()),

    setBoundsElemName ?
      withState('boundsElem', setBoundsElemName, null) :
      withProps(() => ({ boundsElem: document.documentElement })),

    lifecycle({

      componentDidMount() {

        (this as any).updateBounds = ({ [boundsName]: bounds, setBounds, boundsElem }) => {
          if (boundsElem) {
            const rect = (({ top, left, height, width }) => ({ top, left, height, width }))(
              setBoundsElemName ? boundsElem.getBoundingClientRect() : screenRect()
            );
            if (!bounds || Object.keys(rect).some(k => bounds[k] !== rect[k])) setBounds(rect);
          } else if (bounds) {
            setBounds(undefined);
          }
        }
        (this as any).updateBounds((this as any).props);

        (this as any).windowUpdateBounds = () => (this as any).updateBounds((this as any).props);
        window.addEventListener('resize', (this as any).windowUpdateBounds);
      },

      componentWillReceiveProps(nextProps) {
        (this as any).updateBounds(nextProps);
      },

      componentWillUnmount() {
        window.removeEventListener('resize', (this as any).windowUpdateBounds);
      },

    }),

    mapProps(props => omit(props, 'setBounds', 'boundsElem')),

  ) as ComponentEnhancer<any, any>;
}
