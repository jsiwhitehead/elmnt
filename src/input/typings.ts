import { CSSTree } from 'mishmash';

export type StyleKeys = 'invalid' | 'focus' | 'hover' | 'active';

export type ValueType<T> = {
  value: T | null;
  onChange: (value: T | null) => void;
};

export type TextInputBase<T> = ValueType<T> & {
  placeholder?: string;
  style?: CSSTree<StyleKeys | 'placeholder'>;
};
export type BooleanInputBase<T> = ValueType<T> & {
  options: { on: T; off?: T };
  label: string;
  style?: CSSTree<StyleKeys>;
};
export type OptionsInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  style?: CSSTree<StyleKeys | 'group' | 'none'> & {
    layout: 'bar' | 'grid' | 'stack';
    spacing?: number | string;
  };
};
export type TableInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  text: string;
  style?: CSSTree<StyleKeys | 'row' | 'key' | 'none'> & {
    layout: 'table';
    spacing?: number | string;
  };
};
export type ModalInputBase<T> = ValueType<T> & {
  options: T[];
  labels?: string[];
  placeholder?: string;
  style?: CSSTree<StyleKeys | 'selected' | 'placeholder' | 'none'> & {
    layout: 'modal';
  };
};

export type SelectInputBase<T> =
  | BooleanInputBase<T>
  | OptionsInputBase<T>
  | TableInputBase<T>
  | ModalInputBase<T>;

export type BooleanProps = { type: 'boolean' } & SelectInputBase<boolean>;

export type IntProps = { type: 'int' } & (
  | TextInputBase<number>
  | SelectInputBase<number>);

export type FloatProps = { type: 'float' } & (
  | TextInputBase<number>
  | SelectInputBase<number>);

export type StringExtraProps = {
  rows?: number;
  password?: boolean;
  tab?: number;
  spellCheck?: boolean;
};
export type StringProps = { type: 'string' } & (
  | (TextInputBase<string> & StringExtraProps)
  | SelectInputBase<string>);

export type DateExtraProps = {
  noDay?: boolean;
};
export type DateProps = { type: 'date' } & (
  | (TextInputBase<Date> & DateExtraProps)
  | SelectInputBase<Date>);

export interface FileUploaderGoogle {
  uploader: 'google';
  bucket: string;
  accessId: string;
  serverUrl: string;
}
export type FileExtraProps = {
  maxKb?: number;
  fileType?: string | string[];
  config: FileUploaderGoogle;
};
export type FileProps = { type: 'file' } & TextInputBase<string> &
  FileExtraProps;

export type StringlistProps = { type: 'stringlist' } & (
  | TextInputBase<(string | null)[]>
  | SelectInputBase<(string | null)[]>);

export type InputProps = { invalid?: boolean } & (
  | BooleanProps
  | IntProps
  | FloatProps
  | StringProps
  | DateProps
  | FileProps
  | StringlistProps);
