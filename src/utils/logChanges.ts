import { ComponentEnhancer, lifecycle } from 'recompose';

export default function logChanges(label) {
  return lifecycle({
    componentWillUpdate(nextProps) {
      const keys =
        Array.from(new Set([...Object.keys((this as any).props), ...Object.keys(nextProps)]));
      console.log(
        `${label}: ${keys.filter(k => (this as any).props[k] !== nextProps[k]).join(', ')}`
      );
    },
  }) as ComponentEnhancer<any, any>;
}
