import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {Board as BoardComponent} from "@/components/board.js";
import {generateTasks} from "@/mock/task.js";
import {FilterController} from "@/controllers/filter.js";
import {BoardController} from "@/controllers/board.js";
import {render, RenderPosition} from "@/utils/render.js";
import {Tasks as TasksModel} from "@/models/tasks.js";

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

SiteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      SiteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
