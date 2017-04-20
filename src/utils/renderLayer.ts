import { nest } from 'recompose';

import { Comp } from '../typings';

export default function renderLayer(LayerComponent: Comp<any>) {
  return (InnerComponent: Comp<any>) => nest(LayerComponent, InnerComponent);
}
