import { Lang } from 'shiki-languages';

export = scarbon;

declare class scarbon {
  constructor(options?: Options);
  png(code: string, options?: Options): Buffer;
  pretty(code: string, options?: Options): Buffer;
  svg(code: string, options?: Options): string;
  static load(theme: string | object | Buffer): object;
}

declare interface Options {
  formatter?: {
    format?: 'flow' | 'babel' | 'babel-flow' | 'babel-ts' | 'typescript' | 'espree' | 'meriyah' | 'css' | 'less' | 'scss' | 'json' | 'json5' | 'json-stringify' | 'graphql' | 'markdown' | 'mdx' | 'vue' | 'yaml' | 'glimmer' | 'html' | 'angular' | 'lwc',
    trailingComma?: 'all' | 'none' | 'es5'
    tab?: number
    length?: number
    bracketSpacing?: boolean
    semicolon?: boolean
    singleQuote?: boolean
    disabled?: boolean
  }
  background?: string
  padding?: number
  width?: number
  radius?: number
  size?: number
  font?: string
  base?: string
  lang?: Lang
  theme?: string | object
}