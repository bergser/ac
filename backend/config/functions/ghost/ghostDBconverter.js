'use strict';
const fs = require('fs');
const convertTags = require('./convertTags');
const convertPosts = require('./convertPosts');
const transferImages = require('./transferImages');

module.exports = async (fileName) => {

  const rawdata = fs.readFileSync(fileName);
  const ghost_backup = JSON.parse(rawdata);
  const {posts, tags, posts_tags} = ghost_backup.db[0].data;

  posts.sort((a,b)=> Date.parse(a.published_at)>Date.parse(b.published_at));

  // await convertTags(tags);
  // await convertPosts(posts, tags, posts_tags);
  await transferImages();
  
  strapi.log.debug(`All done`);
}
