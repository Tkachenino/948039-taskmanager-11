import {Menu as MenuComponent} from "@/components/menu.js";
import {Filter as FilterComponent} from "@/components/filter.js";
import {Board as BoardComponent} from "@/components/board.js";
import {Tasks as TasksComponent} from "@/components/tasks.js";
import {Sort as SortComponent} from "@/components/sort.js";
import {TaskEdit as TaskEditComponent} from "@/components/taskEdit.js";
import {Task as TaskComponent} from "@/components/task.js";
import {LoadButton as LoadButtonComponent} from "@/components/loadButton.js";
import {generateFilter} from "@/mock/filter.js";
import {generateTasks} from "@/mock/task.js";
import {render, RenderPosition} from "@/utils.js";

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFromSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.onclick = onEditButtonClick;

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.onsubmit = onEditFromSubmit;

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
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
