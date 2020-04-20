import {AbstractComponent as Component} from "@/components/abstractComponent.js";

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
