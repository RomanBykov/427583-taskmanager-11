import {DefaultRepeatingDays, DefaultDescriptions, COLORS} from "../const.js";
import {getRandomArrayItem, getRandomIntInclusive, getRandomBoolean} from "../utils.js";

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const diffValue = sign * getRandomIntInclusive(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {"mo": getRandomBoolean()});
};

const generateTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DefaultDescriptions),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export {generateTask, generateTasks};
