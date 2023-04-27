export default class KeyComponent {
  constructor(keyData) {
    const {
      code, value, order, details, otherLangValue = [],
    } = keyData;
    this.code = code;
    this.value = value;
    this.details = details;
    this.order = order;
    this.element = this.getElement();
    this.otherLangValue = otherLangValue;
  }

  getElement() {
    if (!this.element) {
      const element = document.createElement('button');
      element.classList.add('key');
      element.dataset.details = this.details;
      element.style.order = this.order;
      this.element = element;
      this.updateElement();
    }

    return this.element;
  }

  updateElement() {
    if (Array.isArray(this.value)) {
      const isShiftPressed = false;

      const [firstVariant, secondVariant] = this.value;
      if (isShiftPressed) {
        this.element.textContent = secondVariant;
      } else {
        this.element.textContent = firstVariant;
      }
    } else {
      this.element.textContent = this.value;
    }
  }
}
