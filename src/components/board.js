import {AbstractComponent as Component} from "@/components/abstractComponent.js";

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export class Board extends Component {
  getTemplate() {
    return createBoardTemplate();
  }
}
