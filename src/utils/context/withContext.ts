import * as React from 'react';
import * as PropTypes from 'prop-types';

import renderLayer from '../renderLayer';

import ContextStore from './ContextStore';

export function contextProvider<T>(
  name: string,
  propsToValue: (props: any) => T,
  shouldUpdate: ((newValue: T, oldValue: T) => boolean) = ((a, b) => a !== b),
) {
  return class Provider extends React.Component<{}, {}> {

    private contextStore = new ContextStore(propsToValue(this.props));

    public static contextTypes = { contextStores: PropTypes.object };
    public static childContextTypes = { contextStores: PropTypes.object };

    public getChildContext() {
      return {
        contextStores: {
          ...(this.context.contextStores || {}),
          [name]: this.contextStore,
        },
      }
    }

    public componentWillReceiveProps(nextProps) {
      const newValue = propsToValue(nextProps);
      if (shouldUpdate(newValue, this.contextStore.get())) {
        this.contextStore.set(propsToValue(nextProps));
      }
    }

    public render() {
      return React.Children.only(this.props.children);
    }

  } as React.ComponentClass<{}>;
}

export default function withContext<T>(
  name: string,
  mapPropsToValue: (props: any) => T,
  shouldUpdate: ((newValue: T, oldValue: T) => boolean) = ((a, b) => a !== b),
) {
  return renderLayer(contextProvider(name, mapPropsToValue, shouldUpdate));
}
