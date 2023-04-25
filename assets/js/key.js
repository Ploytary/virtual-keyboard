export default class KeyComponent {
  constructor(code, value, details) {
    this.code = code;
    this.value = value;
    this.details = details;
    this.element = this.getElement();
    this.otherLangValue = [];
  }

  getElement() {
    if (!this.element) {
      const element = document.createElement('button');
      element.classList.add('key');
      element.dataset.code = this.code;
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
