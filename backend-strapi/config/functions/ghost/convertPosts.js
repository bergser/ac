'use strict'
const TurndownService = require('turndown');

module.exports = async (posts, tags, posts_tags) => {

  const postsTotalCount = posts.length;
  strapi.log.debug(`Posts to convert: ${postsTotalCount}`);

  const convertPost = (ghostPost) => {
    const {
      title,
      html,
      published_at,
      status,
      visibility,
      created_at,
      updated_at,
      feature_image
    } = ghostPost;
    const turndownService = new TurndownService();
    const content = html ? turndownService.turndown(html) : '';
  
    return {
      title,
      content,
      author: 1,
      published_at,
      status,
      created_at: Date.parse(created_at),
      updated_at: Date.parse(updated_at),
      feature_image_old: feature_image,
      visibility: visibility === 'paid' ? 'private' : visibility,
      tags: []
    };
  }

  const postsToTags = {};
  for (let value of posts_tags) {
    if (!postsToTags[value.post_id]) {
      postsToTags[value.post_id] = [];
    }
    const tag = tags.filter(t => value.tag_id === t.id)[0];
    postsToTags[value.post_id].push(tag.name);
  }

  let postsConverted = 0;
  let postsFailed = 0;

  for (const ghostPost of posts) {
    const postToAdd = convertPost(ghostPost);

    if (postsToTags[ghostPost.id]) {
      for (let name of postsToTags[ghostPost.id]) {
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
      strapi.log.debug(`[${postsConverted}/${postsTotalCount}] ${addedPost.title}`);
      postsConverted++;
    } catch (error) {
      postsFailed++;
    }
  }

  strapi.log.debug(`Posts converted/failed ${postsConverted}/${postsFailed}`);
}