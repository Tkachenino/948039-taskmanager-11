import {createSiteMenuTemplate} from "@/components/siteMenuTemplate.js";
import {createFilterTemplate} from "@/components/filterTemplate.js";
import {createBoardTemplate} from "@/components/boardTemplate.js";
import {createTaskEditTemplate} from "@/components/taskEditTemplate.js";
import {createTaskTemplate} from "@/components/taskTemplate.js";
import {createLoadBtnTemplate} from "@/components/loadBtnTemplate.js";

const COUNT_TASK = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskBoard = siteMainElement.querySelector(`.board`);
const taskBoardList = taskBoard.querySelector(`.board__tasks`);

render(taskBoardList, createTaskEditTemplate());

for (let i = 0; i < COUNT_TASK; i++) {
  render(taskBoardList, createTaskTemplate());
}

render(taskBoard, createLoadBtnTemplate());
