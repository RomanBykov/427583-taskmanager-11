import moment from "moment";

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

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
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

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
