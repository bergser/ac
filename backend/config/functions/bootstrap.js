'use strict';
const fs = require('fs');
const TurndownService = require('turndown');
const path = require('path');
const mime = require('mime');
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

const convertTags = (tags) => {

  if (!tags[0]) {
    strapi.log.debug(`Tags converted: ${tagsConverted}`);
    return;
  }

  const {name, slug} = tags[0];
  strapi.services.tag.create({
    name,
    slug
  }).then((res)=>{
    tagsConverted++;
    const newArray = tags.slice(1);
    convertTags(newArray);
  });
}

const convertPost = (ghostPost) => {
  const {title, html, published_at, status, visibility} = ghostPost;
  const turndownService = new TurndownService();
  const content = html ? turndownService.turndown(html) : '';
  // html.replace('/content/images','uploads');

  return {
    title,
    content,
    author: 1,
    published_at,
    status,
    visibility: visibility === 'paid' ? 'private' : visibility,
    tags: []
  };
}

const processPosts = async (posts, postsToTags) => {

  if (!posts.length) {
    strapi.log.debug(`Done.`);
    return;
  }
  const postToProcess = posts[0];
  const postToAdd = convertPost(postToProcess);

  if (postsToTags[postToProcess.id]) {
    for (let name of postsToTags[postToProcess.id]) {
      const ctx = {
        name
      };
      const tag = await strapi.services.tag.findOne(ctx);

      if (tag){
        postToAdd.tags.push(tag.id);
      }
    }
  }

  try {
    const addedPost = await strapi.services.post.create(postToAdd);

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


  } catch (e) {
    strapi.log.warn(`postToAdd`, postToAdd);
    strapi.log.warn(e);
  } finally {
    processPosts([...posts.slice(1)], postsToTags);
  }
}

const convertGhostDB =  async (fileName) => {
  const rawdata = fs.readFileSync(fileName);
  const ghost_backup = JSON.parse(rawdata);
  const {posts, tags, posts_tags} = ghost_backup.db[0].data;

  const postsToTags = {};
  for (let value of posts_tags) {
    if (!postsToTags[value.post_id]) {
      postsToTags[value.post_id] = [];
    }
    const tag = tags.filter(t => value.tag_id === t.id)[0];
    postsToTags[value.post_id].push(tag.name);
  }

  await convertTags(tags);

  strapi.log.debug(`Posts to convert: ${posts.length}`);
  await processPosts(posts, postsToTags);
  strapi.log.debug(`All done`);
}

const transferImages = async () => {
  // const posts = await strapi.services.post.find();

  const step = 50;
  let page = 1;
  let posts = [];
  let postsProcessedCount = 0;

  do {
    strapi.log.debug(`Page ${page}`);
    posts = await strapi.query('post').find({
      _start: page === 1 ? 1 : page * step,
      _limit: step
    });
    for (const post of posts) {
      await transferPostImages(post);
      postsProcessedCount++;
    }
    page++;
  } while (posts.length > 1)

  strapi.log.debug(`Posts processed: ${postsProcessedCount}`);
}

const transferPostImages = async (post) => {
  // strapi.log.debug('p', post.title);
  return;
}

module.exports = async () => {
  // await convertGhostDB('./data/ghost.json');
  // await transferImages();
};

