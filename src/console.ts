import { Result, Ok, Err } from "ts-results";

import { exec } from "child_process";
import chalk from "chalk";

import * as t from "./types";
import { colorToBackgroundColor } from "./utils";

import fs from "fs/promises";

const fetchedPackageJson: Promise<t.MinifiedPackageJson | null> =
  fs.readFile("./../../../package.json", "utf8").then(JSON.parse) || null;

export async function setPackageJson(
  packageJson: t.MinifiedPackageJson
): Result<boolean, Error> {
  let pkg = await fetchedPackageJson;
  pkg ||= 2;
}

export function log(
  title: string,
  message: string,
  color: t.chalkFns,
  important = false,
  raw = false
): void | string {
  let projectColor: t.chalkFns = "bgWhite";
  (async () => {
    let pkg = (await fetchedPackageJson) || null;
    if (!pkg) throw "package.json not found";
    switch (pkg.name) {
      case "rsource-records":
        projectColor = "blue";
        break;
      case "rsource-mapforums":
        projectColor = "magenta";
        break;
    }
  })();

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
