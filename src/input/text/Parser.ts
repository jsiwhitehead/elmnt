export interface ParserResult<T, Config> {
  value: T | null;
  config?: Config;
  text?: string;
}

export default class Parser<T, Config = {}, Props = {}> {
  private baseFormat: (
    value: T,
    config: Config,
    props: Props,
  ) => string = value => `${value}`;
  private baseEquals: (a: T, b: T) => boolean = (a, b) => a === b;

  constructor(
    parse: (text: string, props: Props) => ParserResult<T, Config>,
    options?: {
      format?: (value: T, config: Config, props: Props) => string;
      equals?: (a: T, b: T) => boolean;
    },
  ) {
    this.parse = parse;
    if (options && options.format) this.baseFormat = options.format;
    if (options && options.equals) this.baseEquals = options.equals;
  }

  public parse: (text: string, props: Props) => ParserResult<T, Config>;

  public format = (value: T | null, config: Config, props: Props) => {
    if (value === null) return '';
    return this.baseFormat(value, config, props);
  };

  public equals = (a: T | null, b: T | null) => {
    if (a === null || b === null) return a === b;
    return this.baseEquals(a, b);
  };
}
