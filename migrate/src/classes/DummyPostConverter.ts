import type { ConsolaInstance } from "consola";
import type { IPostConverter } from "../types";

export class DummyPostConverter implements IPostConverter {
  private _log: ConsolaInstance;
  public constructor(log: ConsolaInstance) {
    this._log = log.withTag("DummyPostConverter");
  }
  public process: IPostConverter["process"] = async (post) => {
    this._log.info(post);
  };
}
