import { exec } from "child_process";
import chalk from "chalk";
import * as types from "./internal_types";
import { colorToBackgroundColor } from "./internal_utils";
import fs from "fs/promises";

interface MinifiedPackageJson {
  name: string;
  version: string;
}

// Find a way to one line this into the object itself
const fetchedPackageJson: () => Promise<MinifiedPackageJson> = () => {
  return (
    fs.readFile("./../../../package.json", "utf8").then(JSON.parse) || null
  );
};

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
      ? `[${new Date().toLocaleTimeString("en-US")}]`
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
