import {Component} from "@/utils.js";

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export class Tasks extends Component {
  getTemplate() {
    return createTasksTemplate();
  }
}
