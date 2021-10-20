// КОНВЕРТАЦИЯ ЧИСЛА В ЧАСЫ И МИНУТЫ
function getTimeFromMinutes(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'ч ' + minutes + 'м';
};

export default getTimeFromMinutes;

