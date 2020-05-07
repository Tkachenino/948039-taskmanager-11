import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {Board as BoardComponent} from "@/components/board.js";
import {generateTasks} from "@/mock/task.js";
import {FilterController} from "@/controllers/filter.js";
import {BoardController} from "@/controllers/board.js";
import {render, RenderPosition} from "@/utils/render.js";
import {Tasks as TasksModel} from "@/models/tasks.js";
import {Statistics as StatisticsComponent} from "@/components/statistics.js";

const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const SiteMenuComponent = new MenuComponent();
render(siteHeaderElement, SiteMenuComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render();

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
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
