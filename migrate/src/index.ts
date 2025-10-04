import { log } from "./utils";
import * as dotenv from "dotenv";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { DummyPostConverter } from "./classes/DummyPostConverter";
import { GhostPost } from "./types";
dotenv.config();

const main = async () => {
  log.box("Migrate");
  const jsonPath = path.resolve(__dirname, process.env.GHOST_JSON_PATH);
  const rawData = await readFile(jsonPath, "utf-8");
  const config = JSON.parse(rawData);
  const convert = new DummyPostConverter(log);

  if (!config?.["data"]?.["posts"]?.length) {
    return;
  }

  const posts = config?.["data"]?.["posts"] as GhostPost[];

  convert.process(posts[0]);
};

main();
