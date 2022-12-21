import dayjs from 'dayjs';

const DATE_POINT_FORMAT = 'MMM DD';
const TIME_POINT_FORMAT = 'HH:mm';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';

const getRandomNumber = (min, max, exp) => {
  if (exp === undefined) {
    throw new Error ('Введите количество знаков после запятой');
  } else if (max > min && max >= 0 && min >= 0 && typeof(max) === 'number' && typeof(min) === 'number') {
    Number(min.toFixed(exp));
    Number(max.toFixed(exp));
    return parseFloat((Math.random() * (max - min) + min).toFixed(exp)); //Максимум и минимум включаются
  } else if (max === min) {
    return max;
  }
  throw new Error ('Некорректный тип данных');
};

const getRandomArrayElement = (arr) => arr[getRandomNumber(0,arr.length - 1,0)];

const formatDatePoint = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_POINT_FORMAT) : '';

const formatTimePoint = (datePoint) => datePoint ? dayjs(datePoint).format(TIME_POINT_FORMAT) : '';

const formatDateForm = (datePoint) => datePoint ? dayjs(datePoint).format(DATE_FORM_FORMAT) : '';

export {getRandomArrayElement, formatDatePoint, formatTimePoint, formatDateForm};
