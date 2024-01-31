import { BEATFILM_URL } from "../constants/constants"


// ПРЕОБРАЗОВАТЬ ССЫЛКИ ИЗОБРАЖЕНИЙ, КОГДА ЛАЙК - НЕАКТИВНЫЙ
function transformLinksImagesWhenNotActiveLike(card) {
  const imageLink = `${BEATFILM_URL}${card.image.url}`
  const thumbnailLink = `${BEATFILM_URL}${card.image.formats.thumbnail.url}`
  return { imageLink, thumbnailLink }
}

export default transformLinksImagesWhenNotActiveLike