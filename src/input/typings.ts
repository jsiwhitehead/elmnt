import { CSSTree } from 'highstyle';

export type StyleKeys = "invalid" | "focus" | "hover" | "active";

export type ValueType<T> = {
  value: T;
  onChange: (value: T) => void;
};

export type TextInputBase<T> = ValueType<T> & {
  placeholder?: string;
  style?: CSSTree<StyleKeys | "placeholder">;
};
export type BooleanInputBase<T> = ValueType<T> & {
  options: { on: T, off?: T };
  label: string;
  style?: CSSTree<StyleKeys>;
};
export type OptionsInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  style?: CSSTree<StyleKeys | "group"> & {
    layout: 'bar' | 'grid' | 'stack';
    spacing?: number | string;
    childWidths?: number | string;
  };
};
export type TableInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  text: string;
  style?: CSSTree<StyleKeys | "row" | "key"> & {
    layout: 'table';
    spacing?: number | string;
    childWidths?: number | string;
  };
};
export type ModalInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  placeholder?: string;
  style?: CSSTree<StyleKeys | "selected" | "placeholder"> & { layout: 'modal' };
};

export type SelectInputBase<T> =
  BooleanInputBase<T> | OptionsInputBase<T> | TableInputBase<T> | ModalInputBase<T>;

export type BooleanProps = { type: 'boolean' } &
  SelectInputBase<boolean>;

export type IntProps = { type: 'int' } &
  TextInputBase<number> | SelectInputBase<number>;

export type FloatProps = { type: 'float' } &
  TextInputBase<number> | SelectInputBase<number>;

export type TextExtraProps = {
  rows?: number;
  password?: boolean;
  tab?: number;
  spellCheck?: boolean;
};
export type TextProps = { type: 'text' } &
  (TextInputBase<string> & TextExtraProps) | SelectInputBase<string>;

export type DateExtraProps = {
  noDay?: boolean;
};
export type DateProps = { type: 'date' } &
  (TextInputBase<Date> & DateExtraProps) | SelectInputBase<Date>;

export type TextlistProps = { type: 'textlist' } &
  TextInputBase<string[]> | SelectInputBase<string[]>;

export type InputProps = { invalid?: boolean } &
  (BooleanProps | IntProps | FloatProps | TextProps | DateProps | TextlistProps);
