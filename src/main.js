import {createSiteMenuTemplate} from "./components/menu";
import {createSiteFilterTemplate} from "./components/filter";
import {createSiteBoardTemplate} from "./components/sort-board";
import {createEditTaskTemplate} from "./components/task-edit";
import {createTaskTemplate} from "./components/task";
import {createLoadMoreBtnTemplate} from "./components/load-button";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createSiteFilterTemplate());
render(siteMainElement, createSiteBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createEditTaskTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteBoardTasksElement, createTaskTemplate());
}

render(siteBoardElement, createLoadMoreBtnTemplate());
