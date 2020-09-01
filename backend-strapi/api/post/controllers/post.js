'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {

    let entities;

    if (!ctx.state.user) {
      ctx.query.visibility_nin = ["private", "members"];
    }

    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      entities = await strapi.services.post.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.post }));
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {

    const query = { 
      id: ctx.params.id
    };

    if (!ctx.state.user) {
      query.visibility_nin = ["private", "members"];
    }

    const entity = await strapi.services.post.findOne(query);

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
