import {MONTH_NAMES} from "../const.js";

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

export const isExpiredDate = (dueDate) => {
  return dueDate instanceof Date && dueDate < Date.now();
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const setFormatedDate = (isDateShowing, dueDate) => {
  return (isDateShowing && dueDate) ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
};

export const setFormatedTime = (isDateShowing, dueDate) => {
  return (isDateShowing && dueDate) ? formatTime(dueDate) : ``;
};

export const toggleRepeatClass = (isRepeatingTask) => {
  return isRepeatingTask ? `card--repeat` : ``;
};

export const toggleDeadlineClass = (isExpired) => {
  return isExpired ? `card--deadline` : ``;
};

export const isShowingDate = (dueDate) => {
  return !!dueDate;
};

export const isRepeating = (repeatDays) => {
  return Object.values(repeatDays).some(Boolean);
};
