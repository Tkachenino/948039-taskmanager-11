import {Component} from "@/utils.js";

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
