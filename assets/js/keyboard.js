import { KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU } from './constants.js';
import KeyComponent from './key.js';

export default class KeyboardComponent {
  constructor(outputField) {
    this.container = null;
    this.outputField = outputField;
    this.keyComponents = null;
    this.element = null;
  }

  init() {
    const keyboardElementTemplate = (
      `
    <article class="virtual-keyboard">
      <div class="virtual-keyboard__keys-container"></div>
      <p class="virtual-keyboard__note">
        Клавиатура создана в операционной системе Windows<br>
        Для переключения языка комбинация: левыe ctrl + alt
      </p>
    </article>
      `
    );
    const textFieldTemplate = '<textarea class="virtual-keyboard__input-field" name="field" cols="30" rows="10"></textarea>';

    function createElement(template) {
      const container = document.createElement('div');
      container.innerHTML = template;
      return container.firstElementChild;
    }

    this.element = createElement(keyboardElementTemplate);

    if (!this.outputField) {
      const textField = createElement(textFieldTemplate);
      this.element.prepend(textField);
      this.outputField = textField;
    }

    this.keyComponents = KEYBOARD_KEYS
      .filter((keyData) => keyData.order !== undefined)
      .sort((a, b) => a.order - b.order)
      .map((keyData) => new KeyComponent(keyData));
  }

  render(container) {
    if (this.container && this.container !== container) {
      this.element.remove();
      return;
    }

    this.container = container;

    const keysContainer = this.element.querySelector('.virtual-keyboard__keys-container');
    const lineKeysCount = [14, 15, 13, 13, 9];
    let addedKeys = 0;
    lineKeysCount.forEach((lineCount) => {
      const line = document.createElement('div');
      line.classList.add('virtual-keyboard__keys-line');
      this.keyComponents.slice(addedKeys, addedKeys + lineCount)
        .forEach((keyComponent) => {
          line.append(keyComponent.getElement());
        });
      addedKeys += lineCount;
      keysContainer.append(line);
    });

    this.container.append(this.element);
  }
}
