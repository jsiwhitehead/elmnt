const emptyObj = Object.create(null);

export default function memoize<T extends (arg: any) => any>(func: T, stringify?: boolean): T {

  const cache = stringify ? new Map<string, any>() : new WeakMap<any, any>();

  return ((arg: any = emptyObj) => {

    if ((cache as any).has(arg)) return (cache as any).get(arg);

    const result = func(arg);
    (cache as any).set(arg, result);

    return result;

  }) as any;

}
