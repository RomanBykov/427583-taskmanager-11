import {createSiteMenuTemplate} from "./components/menu";
import {createSiteFilterTemplate} from "./components/filter";
import {createSiteBoardTemplate} from "./components/sort-board";
import {createEditTaskTemplate} from "./components/task-edit";
import {createTaskTemplate} from "./components/task";
import {createLoadMoreBtnTemplate} from "./components/load-button";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);

const filters = generateFilters(tasks);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate(filters));
render(siteMainElement, createSiteBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createEditTaskTemplate(tasks[0]));

let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTaskCount).forEach((task) => {
  render(siteBoardTasksElement, createTaskTemplate(task));
});

render(siteBoardElement, createLoadMoreBtnTemplate());

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => {
      render(siteBoardTasksElement, createTaskTemplate(task));
    });

  if (showingTaskCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
