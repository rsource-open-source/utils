import { exec } from "child_process";
import chalk from "chalk";
import * as t from "./types";
import { colorToBackgroundColor } from "./utils";

export function log(
  title: string,
  message: string,
  color: t.chalkFns,
  important = false,
  raw = false
) {
  let structure = {
    date: raw
      ? `[${new Date().toLocaleTimeString("en-US")}]`
      : chalk.gray(`[${new Date().toLocaleTimeString("en-US")}`),
    title: raw
      ? `[${title}]`
      : important
      ? chalk[color](colorToBackgroundColor(color))
      : chalk[color](`[${title}]`),
    message: message,
  };

  let msg = {
    top: `${structure.date} ${structure.title}`,
    msg: structure.message,
  };

  let output = important ? `${msg.top}\n${msg.msg}\n` : `${msg.top} ${msg.msg}`;
  if (raw) return String.raw`${output}`;
  console.log(output);
}

export function err(
  title: string,
  message: string,
  important = false,
  raw = false
): void {
  log(title, message, "red", important, raw);
}

export function warn(
  title: string,
  message: string,
  important = false,
  raw = false
): void {
  log(title, message, "yellow", important, raw);
}

export function getBranch() {
  new Promise((resolve, reject) => {
    return exec("git rev-parse --abbrev-ref HEAD", (err, stdout, _) =>
      err ? reject(err) : resolve(stdout.trim())
    );
  });
}
