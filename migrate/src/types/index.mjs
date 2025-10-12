/**
 * @typedef {Object} GhostPost
 * @property {string} id
 * @property {string} uuid
 * @property {string} title
 * @property {string} slug
 * @property {string} mobiledoc
 * @property {string} html
 * @property {string} comment_id
 * @property {string} plaintext
 * @property {string | null} feature_image
 * @property {number} featured
 * @property {"post"} type
 * @property {"published"} status
 * @property {null} locale
 * @property {"public" | "members"} visibility
 * @property {string} author_id
 * @property {string} created_at
 * @property {string} created_by
 * @property {string} updated_at
 * @property {string | null} updated_by
 * @property {string} published_at
 * @property {string} published_by
 * @property {null} custom_excerpt
 * @property {null} codeinjection_head
 * @property {null} codeinjection_foot
 * @property {null} custom_template
 * @property {null} canonical_url
 * @property {"none"} email_recipient_filter
 * @property {null} newsletter_id
 */

/**
 * @interface IPostConverter
 * @template T - The type of the post to process (implicitly GhostPost here, but often useful to keep it generic in JSDoc for interfaces).
 */
class IPostConverter {
  /**
   * Processes a Ghost post.
   * @param {GhostPost} post - The post object to process.
   * @returns {Promise<void>} A promise that resolves when the post has been processed.
   */
  process(post) {
    throw new Error('Method "process" must be implemented.');
  }
}
