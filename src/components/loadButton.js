import {Component} from "@/utils.js";

const createLoadBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export class LoadButton extends Component {
  getTemplate() {
    return createLoadBtnTemplate();
  }
}
