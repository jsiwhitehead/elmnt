import * as React from 'react';
import { branch, compose, renderComponent } from 'recompose';

import { states, text } from './logic';

import { Label, SelectGrid, SelectModal, SelectTable } from './components';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  style?: React.CSSProperties;
}
export default compose<any, InputProps>(

  states,

  branch(
    ({ options, modal }) => options && modal,
    renderComponent(SelectModal),
  ),

  branch(
    ({ options, label }) => options && label,
    renderComponent(SelectTable),
  ),

  branch(
    ({ type, onValue, offValue, options }) => (
      (type === 'Boolean') || (onValue !== undefined) || (offValue !== undefined) || options
    ),
    renderComponent(SelectGrid),
  ),

  text,

)(Label);
