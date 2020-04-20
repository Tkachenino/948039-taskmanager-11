import {AbstractComponent as Component} from "@/components/abstractComponent.js";

const createLoadBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export class LoadButton extends Component {
  getTemplate() {
    return createLoadBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
