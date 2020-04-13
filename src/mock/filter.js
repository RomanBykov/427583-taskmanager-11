import {filterNames} from "../const";

const filterByOverdue = (task) => {
  const currentDate = new Date();
  return task.dueDate !== null && task.dueDate < currentDate;
};

const filterByToday = (task) => {
  const currentDate = new Date().getDate();
  return task.dueDate !== null && task.dueDate.getDate() === currentDate;
};

const filterByFavorite = (task) => {
  return task.isFavorite;
};

const filterByArchive = (task) => {
  return task.isArchive;
};

const generateFilters = (tasks) => {
  const getCountByFilter = (filterFunc) => {
    return tasks.filter(filterFunc).length;
  };

  const filterMethods = {
    all: tasks.length,
    overdue: getCountByFilter(filterByOverdue),
    today: getCountByFilter(filterByToday),
    favorites: getCountByFilter(filterByFavorite),
    archive: getCountByFilter(filterByArchive)
  };

  return filterNames.map((filterName) => {
    return {
      title: filterName,
      count: filterMethods[filterName]
    };
  });
};

export {generateFilters};
