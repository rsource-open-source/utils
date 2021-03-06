import { ForegroundColor, BackgroundColor } from "chalk";

// Chalk
export type chalkColors =
  | red
  | green
  | yellow
  | blue
  | magenta
  | cyan
  | white
  | gray;

export type red = "red" | "bgRed";
export type green = "green" | "bgGreen";
export type yellow = "yellow" | "bgYellow";
export type blue = "blue" | "bgBlue";
export type magenta = "magenta" | "bgMagenta";
export type cyan = "cyan" | "bgCyan";
export type white = "white" | "bgWhite";
export type gray = "gray" | "bgGray";

export type chalkFns = typeof ForegroundColor | typeof BackgroundColor;

export interface MinifiedPackageJson {
  name: string;
  version: string;
}
