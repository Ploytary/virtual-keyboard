import { KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU } from './constants.js';
import KeyComponent from './key.js';

export default class KeyboardComponent {
  constructor(outputField) {
    this.container = null;
    this.outputField = outputField;
    this.keyComponents = null;
    this.keyData = null;
    this.element = null;
    this.capsLock = false;
    this.shiftKey = false;
    this.ctrlKey = false;
    this.altKey = false;
    this.currentLang = 'primary';
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

    const multilangKeyboardKeys = this.mergeKeyboardKeyData(KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU);
    this.keyComponents = multilangKeyboardKeys
      .filter((keyData) => keyData.order !== undefined)
      .sort((a, b) => a.order - b.order)
      .map((keyData) => new KeyComponent(keyData));

    this.setClickListener();
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

  setClickListener() {
    this.element.addEventListener('click', (evt) => {
      const keyButton = evt.target.closest('.key');
      let printValue = null;
      if (keyButton) {
        switch (keyButton.dataset.details) {
          case 'Tab': printValue = '    ';
            break;
          case 'Enter': printValue = '\n';
            break;
          case 'MetaLeft': printValue = '';
            break;
          case 'Backspace':
            this.deleteChar('backward');
            printValue = '';
            break;
          case 'NumpadDecimal':
            this.deleteChar('forward');
            printValue = '';
            break;
          case 'CapsLock':
            this.switchKeyHoldStatus(keyButton);
            printValue = '';
            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            this.switchKeyHoldStatus(keyButton);
            printValue = '';
            break;
          case 'ControlLeft':
          case 'ControlRight':
            this.switchKeyHoldStatus(keyButton);
            printValue = '';
            break;
          case 'AltLeft':
          case 'AltRight':
            this.switchKeyHoldStatus(keyButton);
            printValue = '';
            break;
          case 'ArrowUp':
            this.moveCaret(-1, 0);
            printValue = '';
            break;
          case 'ArrowDown':
            this.moveCaret(1, 0);
            printValue = '';
            break;
          case 'ArrowLeft':
            this.moveCaret(0, -1);
            printValue = '';
            break;
          case 'ArrowRight':
            this.moveCaret(0, 1);
            printValue = '';
            break;
          default:
            printValue = keyButton.textContent;
        }

        if (!(keyButton.dataset.details === 'ShiftLeft' || keyButton.dataset.details === 'ShiftRight')) {
          this.shiftKey = false;
        }

        this.insertChar(printValue);
        this.updateKeys();
        this.outputField.focus();
      }
      return undefined;
    });
  }

  moveCaret(verticalSteps = 0, horizontalSteps = 0) {
    const charLines = this.outputField.value.split('\n');
    const currentCaretAbsolutePosition = this.outputField.selectionStart;
    const {
      caretLinePosition,
      caretInlinePosition,
    } = this.getCaretRelativePosition(currentCaretAbsolutePosition);

    const forwardLine = charLines[caretLinePosition + verticalSteps];
    if (forwardLine === undefined) {
      return undefined;
    }

    let newCaretPosition = currentCaretAbsolutePosition;
    if (caretInlinePosition === charLines[caretLinePosition].length) {
      if (verticalSteps < 0) {
        newCaretPosition = newCaretPosition - caretInlinePosition - 1;
      }
      if (verticalSteps > 0) {
        newCaretPosition = newCaretPosition + charLines[caretLinePosition + 1].length + 1;
      }
      newCaretPosition += horizontalSteps;
    } else {
      let index = 0;
      newCaretPosition = 0;
      while (index !== caretLinePosition + verticalSteps) {
        newCaretPosition += charLines[index].length + 1;
        index += 1;
      }
      if (caretInlinePosition <= forwardLine.length) {
        newCaretPosition += caretInlinePosition + horizontalSteps;
      } else {
        newCaretPosition += forwardLine.length;
      }
    }

    newCaretPosition = newCaretPosition < 0 ? 0 : newCaretPosition;
    this.outputField.selectionStart = newCaretPosition;
    this.outputField.selectionEnd = newCaretPosition;
    return undefined;
  }

  getCaretRelativePosition(absolutePosition) {
    const charLines = this.outputField.value.split('\n');
    let step = absolutePosition;
    let index = 0;
    for (let i = 0; i < charLines.length; i += 1) {
      if (step > charLines[i].length) {
        step -= charLines[i].length + 1;
        index = i + 1;
      } else {
        break;
      }
    }
    return { caretLinePosition: index, caretInlinePosition: step };
  }

  deleteChar(direction = 'backward') {
    let shift;
    switch (direction) {
      case 'backward':
        shift = -1;
        break;
      case 'forward':
        shift = 0;
        break;
      default:
        shift = -1;
        break;
    }

    let caret = this.outputField.selectionStart + shift;
    if (caret >= 0) {
      this.outputField.value = [this.outputField.value.slice(0, caret), this.outputField.value.slice(caret + 1)].join('');
    } else {
      caret = 0;
    }

    this.outputField.selectionStart = caret;
    this.outputField.selectionEnd = caret;
  }

  insertChar(printValue) {
    if (printValue === '') {
      return undefined;
    }
    const currentCaretAbsolutePosition = this.outputField.selectionStart;
    const charLines = this.outputField.value.split('\n');
    const {
      caretLinePosition,
      caretInlinePosition,
    } = this.getCaretRelativePosition(currentCaretAbsolutePosition);
    const workLine = charLines[caretLinePosition];
    const newLine = [...workLine.slice(0, caretInlinePosition), printValue, ...workLine.slice(caretInlinePosition)].join('');
    charLines[caretLinePosition] = newLine;
    this.outputField.value = charLines.join('\n');

    let index = 0;
    let newCaretPosition = 0;
    while (charLines[index] !== newLine) {
      newCaretPosition += charLines[index].length + 1;
      index += 1;
    }
    newCaretPosition += caretInlinePosition + printValue.length;

    this.outputField.selectionStart = newCaretPosition;
    this.outputField.selectionEnd = newCaretPosition;
    return undefined;
  }

  switchKeyHoldStatus(key) {
    switch (key.dataset.details) {
      case 'ShiftLeft':
      case 'ShiftRight': this.shiftKey = !this.shiftKey;
        break;
      case 'ControlLeft':
      case 'ControlRight': this.ctrlKey = !this.ctrlKey;
        break;
      case 'AltLeft':
      case 'AltRight': this.altKey = !this.altKey;
        break;
      case 'CapsLock': this.capsLock = !this.capsLock;
        break;
      default: return undefined;
    }

    if (this.ctrlKey && this.shiftKey) {
      this.switchInputLanguage();
      this.ctrlKey = false;
      this.shiftKey = false;
    }

    return undefined;
  }

  switchKeyHoldClass(searchKeyCode, keyStatus) {
    this.keyComponents
      .filter((component) => component.code === searchKeyCode)
      .map((component) => component.getElement())
      .forEach((element) => {
        if (keyStatus) {
          element.classList.add('virtual-keyboard__key--hold');
        } else {
          element.classList.remove('virtual-keyboard__key--hold');
        }
      });
    return undefined;
  }

  updateKeys() {
    const mayHoldedKeyList = [
      { keyCode: 16, keyStatusSource: this.shiftKey },
      { keyCode: 17, keyStatusSource: this.ctrlKey },
      { keyCode: 18, keyStatusSource: this.altKey },
      { keyCode: 20, keyStatusSource: this.capsLock },
    ];

    mayHoldedKeyList.forEach(({ keyCode, keyStatusSource }) => {
      this.switchKeyHoldClass(keyCode, keyStatusSource);
    });

    this.keyComponents.forEach((component) => {
      let keyValue = component.value;
      if (this.currentLang === 'secondary') {
        if (component.otherLangValue.length === 2) {
          keyValue = component.otherLangValue;
        }
        if (component.otherLangValue.length === 1) {
          keyValue = [component.value[0], component.otherLangValue[0]];
        }
      }

      const element = component.getElement();
      const keyMode = this.getKeyInputMode();

      if (keyMode === 'base') {
        element.textContent = Array.isArray(keyValue)
          ? keyValue[0]
          : keyValue;
      }

      if (keyMode === 'alt') {
        if (Array.isArray(keyValue)) {
          element.textContent = keyValue.length > 1
            ? keyValue[1]
            : keyValue[0];
        } else {
          element.textContent = keyValue;
        }
      }
    });
  }

  switchInputLanguage() {
    this.currentLang = this.currentLang === 'primary' ? 'secondary' : 'primary';
  }

  mergeKeyboardKeyData(primaryLangKeyboardKeyData, secondaryLangKeyboardKeyData) {
    const mergedData = primaryLangKeyboardKeyData
      .map((basekey) => {
        const langKeyData = secondaryLangKeyboardKeyData
          .find((langKey) => langKey.code === basekey.code);
        let result = {};
        if (langKeyData) {
          result = {
            ...basekey,
            otherLangValue: langKeyData.value,
          };
        } else {
          result = { ...basekey };
        }
        return result;
      });
    this.keyData = mergedData;
    return mergedData;
  }

  getKeyInputMode() {
    let keyMode = null;
    if (this.shiftKey && this.capsLock) {
      keyMode = 'base';
    } else if (this.capsLock || this.shiftKey) {
      keyMode = 'alt';
    } else {
      keyMode = 'base';
    }
    return keyMode;
  }
}
