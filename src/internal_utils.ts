// This file is for functions that are used internally by the library.

import * as types from "./internal_types";

export function colorToBackgroundColor(
  string: types.chalkFns
): types.chalkFns | undefined {
  switch (string) {
    case "red":
      return "bgRed";
    case "green":
      return "bgGreen";
    case "yellow":
      return "bgYellow";
    case "blue":
      return "bgBlue";
    case "magenta":
      return "bgMagenta";
    case "cyan":
      return "bgCyan";
    case "white":
      return "bgWhite";
    case "gray":
      return "bgGray";
  }
}
