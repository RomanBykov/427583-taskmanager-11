import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-tasks.js";
import TaskEditComponent from "../components/task-edit.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import SortComponent from "../components/sort.js";
import {render, replace, remove} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const escKeydownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(taskComponent, taskEditComponent);
      document.removeEventListener(`keydown`, escKeydownHandler);
    }
  };

  const editButtonClickHandler = () => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener(`keydown`, escKeydownHandler);
  };

  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();

    replace(taskComponent, taskEditComponent);
    document.removeEventListener(`keydown`, escKeydownHandler);
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(editButtonClickHandler);

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler(editFormSubmitHandler);

  render(taskListElement, taskComponent);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = container.querySelector(`.board__tasks`);

    const renderTasks = (prevTaskCount, showingTasksCount) => {
      tasks.slice(prevTaskCount, showingTasksCount)
        .forEach((task) => {
          renderTask(taskListElement, task);
        });
    };

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(0, showingTasksCount);

    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(container, loadMoreButtonComponent);

    const loadButtonClickHandler = () => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      renderTasks(prevTaskCount, showingTasksCount);

      if (showingTasksCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    };

    loadMoreButtonComponent.setClickHandler(loadButtonClickHandler);
  }
}
