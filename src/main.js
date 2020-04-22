import {Menu as MenuComponent} from "@/components/menu.js";
import {Filter as FilterComponent} from "@/components/filter.js";
import {Board as BoardComponent} from "@/components/board.js";
import {generateFilter} from "@/mock/filter.js";
import {generateTasks} from "@/mock/task.js";
import {BoardController} from "@/controllers/board.js";
import {render, RenderPosition} from "@/utils/render.js";

const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilter();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new MenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
