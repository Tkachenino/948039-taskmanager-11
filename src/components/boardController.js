import {Tasks as TasksComponent} from "@/components/tasks.js";
import {Sort as SortComponent} from "@/components/sort.js";
import {TaskEdit as TaskEditComponent} from "@/components/taskEdit.js";
import {Task as TaskComponent} from "@/components/task.js";
import {LoadButton as LoadButtonComponent} from "@/components/loadButton.js";
import {NoTasks as NoTasksComponent} from "@/components/noTasks.js";
import {render, replace, remove, RenderPosition} from "@/utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const onEscKeyDowm = (evt) => {
    const isEscKey = evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDowm);
    }
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.onkeydown = onEscKeyDowm;
  });

  const taskEditComponent = new TaskEditComponent(task);

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDowm);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) =>task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = container.querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

    const loadButtonComponet = this._loadButtonComponent;
    render(container, loadButtonComponet, RenderPosition.BEFOREEND);

    loadButtonComponet.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTaskCount, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

      if (showingTasksCount >= tasks.length) {
        remove(loadButtonComponet);
      }
    });
  }
}
