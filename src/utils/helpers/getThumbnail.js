// ПОЛУЧАЕМ ИЗОБРАЖЕНИЕ thumbnail ДЛЯ API /movies
function getThumbnail(data) {
  return data.image.formats.thumbnail;
}

export default getThumbnail;