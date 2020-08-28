'use strict'
const mime = require('mime');
const path = require('path');
const fs = require('fs');
// const transferImage = require('./transferImage');

module.exports = async () => {
  const step = 50;
  let page = 1;
  let posts = [];
  let postsProcessedCount = 0;

  const postsCount = await strapi.services.post.count();
  strapi.log.debug(`Posts to process: ${postsCount}`);

  const getImagePath = value => {
    return `../../../public${value}`;
  }

  do {
    strapi.log.debug(`Page ${page}`);
    posts = await strapi.services.post.find({
      _start: page === 1 ? 1 : page * step,
      _limit: step
    });

    for (const post of posts) {

      let postImagesCount = 0;
      const files = {
        images: []
      };

      if (post.feature_image_old) {
        const featureImagePathName = require.resolve(getImagePath(post.feature_image_old));
        let stats = fs.statSync(featureImagePathName);
        files.feature_image = {
          path: featureImagePathName,
          size: stats["size"],
          name: path.basename(featureImagePathName),
          type: mime.getType(featureImagePathName),
          fileInfo: {
            caption: post.feature_image_old,
            alternativeText: post.feature_image_old,
          }
        };
      }

      const pattern = /(\/content\/images\/.*\.(jpg|png|gif))/g;
      post.content.replace(pattern, async (value) => {
        const pathName = require.resolve(getImagePath(value));
        let stats = fs.statSync(pathName);

        files.images.push ({
          path: pathName,
          size: stats["size"],
          name: path.basename(pathName),
          type: mime.getType(pathName),
          caption: value
        });

        postImagesCount++;
      });

      try {
        await strapi.entityService.uploadFiles(post, files, {
          model: strapi.models.post.modelName,
        });
      } catch (error) {
        strapi.log.debug(error);
      }

      strapi.log.debug(`[${postsProcessedCount}] ${postImagesCount} images found ${post.title}`);
      postsProcessedCount++;
    }

    page++;
  } while (posts.length > 1 || postsProcessedCount < 5)

  strapi.log.debug(`Posts processed: ${postsProcessedCount}`);
}