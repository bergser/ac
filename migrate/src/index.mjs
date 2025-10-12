#!/usr/bin/env node
import { log } from "./utils/index.mjs";
import * as dotenv from "dotenv";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { DummyPostConverter } from "./classes/DummyPostConverter.mjs";
import { Formatter } from "./classes/Formatter.mjs";
import { Command } from "commander";

dotenv.config();

const program = new Command();

program.name("gh").description("Converting posts from ghost").version("1.0.0");

program
  .command("posts")
  .argument("<dir>", "Directory")
  .description("Split a string into substrings and display as an array")
  .action(async (dir) => {
    const jsonPath = path.resolve(dir, process.env.GHOST_JSON_PATH);
    const rawData = await readFile(jsonPath, "utf-8");
    const config = JSON.parse(rawData);
    const formatter = new Formatter(log);
    const convert = new DummyPostConverter(log, formatter);

    if (!config?.["data"]?.["posts"]?.length) {
      return;
    }

    /** @type Array<import('./types/index.mjs').GhostPost> */
    const posts = config?.["data"]?.["posts"];
    convert.process(posts[0]);
  });

program.parse();
