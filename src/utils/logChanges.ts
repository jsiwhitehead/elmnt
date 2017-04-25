import { ComponentEnhancer, lifecycle } from 'recompose';

export default function logChanges(label) {
  return lifecycle({
    componentWillUpdate(nextProps) {
      const keys = Array.from(new Set([...Object.keys(this.props), ...Object.keys(nextProps)]));
      console.log(`${label}: ${keys.filter(k => this.props[k] !== nextProps[k]).join(', ')}`);
    },
  }) as ComponentEnhancer<any, any>;
}
