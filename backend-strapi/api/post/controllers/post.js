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

    const user = ctx.state.user;
    strapi.log.debug(user);

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
    const { id } = ctx.params;
    console.log(ctx);

    const entity = await strapi.services.post.findOne({ id });

    // const pattern = /(\/uploads\/.*\.(jpg|png|gif))/g;
    // entity.content = entity.content.replace(pattern, value => {
    //   return 'http://localhost:1337' + value;
    // });

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
