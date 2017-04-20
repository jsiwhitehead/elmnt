import * as React from 'react';

export type Obj<T> = { [key: string]: T };

export type Comp<T> = React.ComponentClass<T> | React.StatelessComponent<T>;
