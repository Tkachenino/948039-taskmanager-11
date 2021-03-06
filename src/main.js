import API from "@/API/api.js";
import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {Board as BoardComponent} from "@/components/board.js";
// import {generateTasks} from "@/mock/task.js";
import {FilterController} from "@/controllers/filter.js";
import {BoardController} from "@/controllers/board.js";
import {render, RenderPosition} from "@/utils/render.js";
import {Tasks as TasksModel} from "@/models/tasks.js";
import {Statistics as StatisticsComponent} from "@/components/statistics.js";

const AUTHORIZATION = `Basic Sdakld3qm5qwinV2`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

// const TASK_COUNT = 2;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();


// const tasks = generateTasks(TASK_COUNT);
const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

// tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const SiteMenuComponent = new MenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});


const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, SiteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
// boardController.render();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();


SiteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      SiteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      boardController.show();
      statisticsComponent.hide();
      break;
  }
});

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
