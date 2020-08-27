'use strict'

module.exports = async (tags) => {

  strapi.log.debug('Converting Tags');

  const tagsToConvert = tags.length;
  let convertedTagsCount = 0;
  
  await tags.forEach(async(ghostTag) => {
    
    const {name, slug} = ghostTag;
    const tag = await strapi.services.tag.findOne({
      _where: {
        slug
      }
    });
    
    if (tag) {
      return;
    }

    try {
      await strapi.services.tag.create({name, slug});
      convertedTagsCount++;
    } catch (e) {
      strapi.log.debug(e);
    }
  });

  strapi.log.debug('Tags converted:', `${convertedTagsCount}/${tagsToConvert}`);
}