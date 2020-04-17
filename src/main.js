import {Menu as MenuComponent} from "@/components/menu.js";
import {Filter as FilterComponent} from "@/components/filter.js";
import {Board as BoardComponent} from "@/components/board.js";
import {Tasks as TasksComponent} from "@/components/tasks.js";
import {Sort as SortComponent} from "@/components/sort.js";
import {TaskEdit as TaskEditComponent} from "@/components/taskEdit.js";
import {Task as TaskComponent} from "@/components/task.js";
import {LoadButton as LoadButtonComponent} from "@/components/loadButton.js";
import {NoTasks as NoTasksComponent} from "@/components/noTasks.js";
import {generateFilter} from "@/mock/filter.js";
import {generateTasks} from "@/mock/task.js";
import {render, RenderPosition} from "@/utils.js";

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEscKeyDowm = (evt) => {
    const isEscKey = evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDowm);
    }
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.onclick = () => {
    replaceTaskToEdit();
    document.onkeydown = onEscKeyDowm;
  };

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.onsubmit = (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDowm);
  };

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) =>task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
  .forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadButtonComponet = new LoadButtonComponent();
  render(boardComponent.getElement(), loadButtonComponet.getElement(), RenderPosition.BEFOREEND);

  loadButtonComponet.getElement().onclick = () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTaskCount, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (showingTasksCount >= tasks.length) {
      loadButtonComponet.getElement().remove();
      loadButtonComponet.removeElement();
    }
  };
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilter();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
