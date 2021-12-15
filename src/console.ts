import { exec } from "child_process";
import chalk from "chalk";
import * as types from "./internal_types";
import { colorToBackgroundColor } from "./internal_utils";
//@ts-ignore
import * as fetchedPackageJson from "./../../../package.json";

export function log(
  title: string,
  message: string,
  color: types.chalkFns,
  important = false,
  raw = false
): void | string {
  let projectColor: types.chalkFns = "bgWhite";
  switch (fetchedPackageJson.name) {
    case "rsource-records":
      projectColor = "blue";
      break;
    case "rsource-mapforums":
      projectColor = "magenta";
      break;
  }

  let structure = {
    date: raw
      ? `[${new Date().toLocaleTimeString("en-US")}`
      : chalk.gray(`[${new Date().toLocaleTimeString("en-US")}`),
    project: raw
      ? `[${fetchedPackageJson.name}]`
      : chalk[projectColor](`[${fetchedPackageJson.name}]`),
    title: raw
      ? `[${title}]`
      : important
      ? chalk[color](colorToBackgroundColor(color))
      : chalk[color](`[${title}]`),
    message: message,
  };

  let msg = {
    top: `${structure.date} ${structure.project} ${structure.title}`,
    msg: structure.message,
  };

  let output = important ? `${msg.top}\n${msg}\n` : `${msg.top} ${msg}`;
  if (raw) return String.raw`${output}`;
  console.log(output);
}

export function logErr(
  title: string,
  message: string,
  important = false,
  raw = false
): void {
  log(title, message, "red", important, raw);
}

export function logWarn(
  title: string,
  message: string,
  important = false,
  raw = false
): void {
  log(title, message, "yellow", important, raw);
}

export function getBranch() {
  new Promise((resolve, reject) => {
    return exec("git rev-parse --abbrev-ref HEAD", (err, stdout, _) => {
      if (err) console.error(err);
      else if (stdout === undefined) reject("lol");
      else if (typeof stdout === "string") resolve(stdout.trim());
    });
  });
}
