import {Component} from "@/utils.js";

const createNoTasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
  );
};

export class NoTasks extends Component {
  getTemplate() {
    return createNoTasksTemplate();
  }
}
