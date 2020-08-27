'use strict'

const mime = require('mime');
const path = require('path');

const transferImage = async () => {
  //https://github.com/strapi/strapi/issues/5475
  if (postToProcess.feature_image) {

    const pathName = require.resolve(`../../public/${postToProcess.feature_image}`);
    strapi.log.debug(`Uploading `, pathName);
    let stats = fs.statSync(pathName);
    const files = {
      feature_image: {
        path: pathName,
        size: stats["size"],
        name: path.basename(pathName),
        type: mime.getType(pathName)
      }
    };

    const r = await strapi.entityService.uploadFiles(addedPost, files, {
      model: strapi.models.post.modelName,
    });
    strapi.log.debug('Response', r);
  }
}

module.exports = async () => {
  const step = 50;
  let page = 1;
  let posts = [];
  let postsProcessedCount = 0;

  const postsCount = await strapi.services.post.count();
  strapi.log.debug(`Posts to process: ${postsCount}`);

  do {
    strapi.log.debug(`Page ${page}`);
    posts = await strapi.services.post.find({
      _start: page === 1 ? 1 : page * step,
      _limit: step
    });

    for (const post of posts) {

      let postImagesCount = 0;

      const pattern = /(\/content\/images\/.*\.jpg|png|gif)/g;
      post.content.replace(pattern, async (value) => {
        //strapi.log.debug(value);
        postImagesCount++;
      });

      strapi.log.debug(`${postImagesCount} images found ${post.title}`);
      postsProcessedCount++;
    }

    page++;
  } while (posts.length > 1)

  strapi.log.debug(`Posts processed: ${postsProcessedCount}`);
}