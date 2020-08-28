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
  let filesUploadedCount = 0;

  const uploadService = strapi.plugins.upload.services.upload;

  const postsCount = await strapi.services.post.count();
  strapi.log.debug(`Posts to process: ${postsCount}`);

  const createFile = value => {
    const pathName = require.resolve(`../../../public${value}`);
    let stats = fs.statSync(pathName);

    return {
      path: pathName,
      size: stats["size"],
      name: path.basename(pathName),
      type: mime.getType(pathName),
      alternativeText: value
    };
  }

  do {
    strapi.log.debug(`Page ${page}`);
    posts = await strapi.services.post.find({
      _start: page === 1 ? 1 : page * step,
      _limit: step
    });

    for (const post of posts) {

      let postImagesCount = 0;
      const files = [];
      
      const pattern = /(\/content\/images\/.*\.(jpg|png|gif))/g;
      post.content.replace(pattern, value => {
        const file = createFile(value);
        files.push(file);
        postImagesCount++;
        return value;
      });

      if (post.feature_image_old && !files.find(f => {f.alternativeText === post.feature_image_old})) {
        const file = createFile(post.feature_image_old);
        files.push(file);
      }

      try {
        const enhancedFiles = await Promise.all(
          files.map(file => {
            return uploadService.enhanceFile(
              file,
              {
                alternativeText: file.alternativeText,
              },
              {
                refId: post.id,
                ref: 'post',
                //source: undefined,
                field: 'images',
              }
            );
          })
        );
    
        const uploadedFiles = await Promise.all(enhancedFiles.map(file => uploadService.uploadFileAndPersist(file)));
        
        if (!uploadedFiles || uploadedFiles.length < 1) {
          continue;
        }

        filesUploadedCount += uploadedFiles.length;

        const content = post.content.replace(pattern, value => {
          const file = uploadedFiles.find(f => f.alternativeText === value);
          if (file) {
            return file.url;
          }
          return value;
        });

        const request = {content};
        const feature_image = uploadedFiles.find(f => f.alternativeText === post.feature_image_old);
        if (feature_image) {
          request.feature_image = feature_image.id
        }

        const r = await strapi.services.post.update({id: post.id}, request);

        postsProcessedCount++;

        strapi.log.debug(`Post [${postsProcessedCount}/${postsCount}] [${uploadedFiles.length}] - ${r.title}`);

      } catch (error) {
        strapi.log.debug(error);
      }
    }

    page++;
    
  } while (posts.length > 0)
  strapi.log.debug(`Images converted ${filesUploadedCount}`);
}