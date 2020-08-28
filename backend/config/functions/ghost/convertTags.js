'use strict'

module.exports = async (tags) => {

  strapi.log.debug('Converting Tags');

  const tagsToConvert = tags.length;
  let convertedTagsCount = 0;

  for (const ghostTag of tags) {
    const {name, slug} = ghostTag;
    const tag = await strapi.services.tag.findOne({slug});
    
    if (tag) return;

    const createdTag = await strapi.services.tag.create({name, slug});
    convertedTagsCount++;
    strapi.log.debug(`[${convertedTagsCount}/${tagsToConvert}] ${createdTag.name}`)
  }
  
  strapi.log.debug('Tags converted:', `${convertedTagsCount}/${tagsToConvert}`);
}