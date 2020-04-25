import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import {render, replace} from "../utils/render.js";

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);


    const editButtonClickHandler = () => {
      this._replaceTaskToEdit();
    };

    const editFormSubmitHandler = (evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    };

    this._taskComponent.setEditButtonClickHandler(editButtonClickHandler);
    this._taskEditComponent.setSubmitHandler(editFormSubmitHandler);

    render(this._container, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
  }

  _escKeydownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
    }
  }
}
