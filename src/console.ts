import { exec } from "child_process";
import chalk from "chalk";
import * as pkgi from "./../package.json";

export module rconsole {
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
    };

    let msg = {
      top: `${structure.date} ${structure.project} ${structure.title}`,
      msg: structure.message,
    };

    let output = important
      ? `\n-- ${msg.top}\n-- ${msg}\n`
      : `${msg.top} ${msg}`;
    chalk.reset;
    if (raw) return String.raw`${output}`;
    console.log(output);
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
}
