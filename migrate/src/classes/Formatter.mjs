import TurndownService from "turndown";

export class Formatter {
  /** @type {import('consola').ConsolaInstance} */
  _log;

  /** @type {import('turndown').TurndownService} */
  _td;

  /**
   * @param {import('consola').ConsolaInstance} log
   */
  constructor(log) {
    this._log = log.withTag("Formatter");
    this._log.info("Creating Turndown instance");
    this._td = new TurndownService();
  }

  toPostContent(str) {
    return this._td.turndown(str);
  }
}
