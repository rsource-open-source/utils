import { exec } from "child_process";
import chalk from "chalk";
//@ts-ignore
import * as pkgi from "./../../../package.json";

type chalkFns =
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite"
  | "bgGray";

export function log(
  title: string,
  message: string,
  color: chalkFns,
  important?: boolean,
  subtitle?: string, // only works if important is true
  raw?: boolean
): void | string {
  let projectColor: chalkFns = "bgWhite";
  switch (pkgi.name) {
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
    project: raw ? `[${pkgi.name}]` : chalk[projectColor](`[${pkgi.name}]`),
    title: raw ? `[${title}]` : chalk[color](`[${title}]`),
    message: message,
    subtitle: raw ? subtitle : chalk[color](subtitle),
  };

  let msg = {
    top: `${structure.date} ${
      structure.subtitle ? structure.subtitle + " " : " "
    }${structure.project} ${structure.title}`,
    msg: structure.message,
  };

  let output = important ? `\n-- ${msg.top}\n-- ${msg}\n` : `${msg.top} ${msg}`;
  chalk.reset;
  if (raw) return String.raw`${output}`;
  console.log(output);
}

export function logErr(
  title: string,
  message: string,
  // color: chalkFns,
  important?: boolean,
  subtitle?: string, // only works if important is true
  raw?: boolean
): void {
  log(title, message, "red", important, subtitle, raw);
}

export function logWarn(
  title: string,
  message: string,
  // color: chalkFns,
  important?: boolean,
  subtitle?: string, // only works if important is true
  raw?: boolean
): void {
  log(title, message, "yellow", important, subtitle, raw);
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
