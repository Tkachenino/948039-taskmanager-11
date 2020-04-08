import {createSiteMenuTemplate} from "@/components/siteMenuTemplate.js";
import {createFilterTemplate} from "@/components/filterTemplate.js";
import {createBoardTemplate} from "@/components/boardTemplate.js";
import {createTaskEditTemplate} from "@/components/taskEditTemplate.js";
import {createTaskTemplate} from "@/components/taskTemplate.js";
import {createLoadBtnTemplate} from "@/components/loadBtnTemplate.js";
import {generateFilter} from "@/mock/filter.js";
import {generateTasks} from "@/mock/task.js";

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());

const filters = generateFilter();
const tasks = generateTasks(TASK_COUNT);

render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskBoard = siteMainElement.querySelector(`.board`);
const taskBoardList = taskBoard.querySelector(`.board__tasks`);

render(taskBoardList, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => render(taskBoardList, createTaskTemplate(task)));

render(taskBoard, createLoadBtnTemplate(), `beforeend`);

const loadBtn = taskBoard.querySelector(`.load-more`);

loadBtn.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount)
  .forEach((task) => {
    render(taskBoardList, createTaskTemplate(task));
  });
  if (showingTasksCount >= tasks.length) {
    loadBtn.remove();
  }
});
