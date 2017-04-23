import { compose, ComponentEnhancer, lifecycle, mapProps, withProps, withState } from 'recompose';
import * as omit from 'lodash.omit';

const screenRect = () => ({
  top: 0, height: document.documentElement.clientHeight,
  left: 0, width: document.documentElement.clientWidth,
});

export default function withBounds(boundsName: string, setBoundsElemName?: string) {
  return compose(

    withState(boundsName, 'setBounds', setBoundsElemName ? undefined : screenRect()),

    setBoundsElemName ?
      withState('boundsElem', setBoundsElemName, null) :
      withProps(() => ({ boundsElem: document.documentElement })),

    lifecycle({

      componentDidMount() {

        this.updateBounds = ({ [boundsName]: bounds, setBounds, boundsElem }) => {
          if (boundsElem) {
            const rect = (({ top, left, height, width }) => ({ top, left, height, width }))(
              setBoundsElemName ? boundsElem.getBoundingClientRect() : screenRect()
            );
            if (!bounds || Object.keys(rect).some(k => bounds[k] !== rect[k])) setBounds(rect);
          } else if (bounds) {
            setBounds(undefined);
          }
        }
        this.updateBounds(this.props);

        this.windowUpdateBounds = () => this.updateBounds(this.props);
        window.addEventListener('resize', this.windowUpdateBounds);
      },

      componentWillReceiveProps(nextProps) {
        this.updateBounds(nextProps);
      },

      componentWillUnmount() {
        window.removeEventListener('resize', this.windowUpdateBounds);
      },

    }),

    mapProps(props => omit(props, 'setBounds', 'boundsElem')),

  ) as ComponentEnhancer<any, any>;
}
