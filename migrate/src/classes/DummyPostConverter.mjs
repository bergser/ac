export class DummyPostConverter {
  /** @type {import('consola').ConsolaInstance} */
  _log;
  /** @type {import('./Formatter.mjs').Formatter} */
  _format;
  /**
   * @param {import('consola').ConsolaInstance} log
   * @param {import('./Formatter.mjs').Formatter} format
   */
  constructor(log, format) {
    this._log = log;
    this._format = format;
  }

  /**
   * Calculate the shape's area.
   */
  process = async (post) => {
    const content = this._format.toPostContent(post.html);
    this._log.info(content);
  };
}
