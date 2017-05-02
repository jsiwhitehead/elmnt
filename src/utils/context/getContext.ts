import * as PropTypes from 'prop-types';
import {
  ComponentEnhancer, compose, getContext as getReactContext, lifecycle, mapProps, withState,
} from 'recompose';
import * as omit from 'lodash.omit';

import ContextStore from './ContextStore';

export interface ContextProps {
  contextStores?: { [name: string]: ContextStore<any> };
}
export default function getContext<P, T>(name: string) {
  return compose<P & T, P>(
    getReactContext({ contextStores: PropTypes.object }),
    withState(
      name, 'setContextValue',
      ({ contextStores }: ContextProps) => (
        contextStores && contextStores[name] && contextStores[name].get()
      ),
    ),
    lifecycle({
      componentDidMount() {
        const { contextStores, setContextValue } = (this as any).props;
        if (contextStores && contextStores[name]) {
          (this as any).unsubscribe =
            contextStores[name].subscribe(value => setContextValue(value));
        }
      },
      componentWillUnmount() {
        (this as any).unsubscribe && (this as any).unsubscribe();
      },
    }),
    mapProps(props => omit(props, 'contextStores', 'setContextValue')),
  ) as ComponentEnhancer<P & T, P>;
}
