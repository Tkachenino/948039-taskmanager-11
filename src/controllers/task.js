import {TaskEdit as TaskEditComponent} from "@/components/taskEdit.js";
import {Task as TaskComponent} from "@/components/task.js";
import {render, replace, RenderPosition} from "@/utils/render.js";

export class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._taskEditComponent = null;
    this._taskComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape`;
    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    }

  }

  render(task) {
    this._taskEditComponent = new TaskEditComponent(task);
    this._taskComponent = new TaskComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.onkeydown = this._onEscKeyDowm;
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDowm);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
  }
}
