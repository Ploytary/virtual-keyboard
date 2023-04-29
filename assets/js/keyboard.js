import { KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU } from './constants.js';
import KeyComponent from './key.js';

export default class KeyboardComponent {
  constructor(currentLang = 'primary') {
    this.container = null;
    this.outputField = null;
    this.keyComponents = null;
    this.keyData = null;
    this.element = null;
    this.capsLock = false;
    this.shiftKey = false;
    this.ctrlKey = false;
    this.altKey = false;
    this.currentInpuMode = 'physical';
    this.currentLang = currentLang;
  }

  init(outputField) {
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
    const textFieldTemplate = `<div class="virtual-keyboard__message">
      <textarea class="virtual-keyboard__input-field" name="field" cols="30" rows="10"></textarea>
      <p class="virtual-keyboard__input-field-label">MESSAGE</p>
    </div>`;

    function createElement(template) {
      const container = document.createElement('div');
      container.innerHTML = template;
      return container.firstElementChild;
    }

    this.element = createElement(keyboardElementTemplate);

    this.outputField = outputField;

    if (!this.outputField) {
      const messageContainerElement = createElement(textFieldTemplate);
      const textField = messageContainerElement.querySelector('textarea');
      this.element.prepend(messageContainerElement);
      this.outputField = textField;
    }

    const multilangKeyboardKeys = this.mergeKeyboardKeyData(KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU);
    this.keyComponents = multilangKeyboardKeys
      .filter((keyData) => keyData.order !== undefined)
      .sort((a, b) => a.order - b.order)
      .map((keyData) => new KeyComponent(keyData));

    this.setPointerEventListener();
    this.setKeyboardEventListener();
    setTimeout(() => { this.outputField.focus(); }, 0);
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
          const shadowWrapper = document.createElement('div');
          shadowWrapper.classList.add('virtual-keyboard__key-shadow-wrapper');
          shadowWrapper.dataset.details = keyComponent.details;
          shadowWrapper.append(keyComponent.getElement());
          line.append(shadowWrapper);
        });
      addedKeys += lineCount;
      keysContainer.append(line);
    });
    this.updateKeys();
    this.container.append(this.element);
  }

  setPointerEventListener() {
    this.element.addEventListener('pointerdown', (evt) => {
      this.currentInpuMode = 'virtual';
      const keyButton = evt.target.closest('.key');
      let printValue = null;

      if (keyButton) {
        printValue = this.getKeyPrintValue(keyButton);

        if (!(keyButton.dataset.details === 'ShiftLeft' || keyButton.dataset.details === 'ShiftRight')) {
          this.shiftKey = false;
        }

        keyButton.classList.add('virtual-keyboard__key--pressed');
        keyButton.parentElement.classList.add('virtual-keyboard__key--pressed');
        const animationendHadler = () => {
          keyButton.classList.remove('virtual-keyboard__key--pressed');
          keyButton.parentElement.classList.remove('virtual-keyboard__key--pressed');
          keyButton.removeEventListener('animationend', animationendHadler);
        };
        keyButton.addEventListener('animationend', animationendHadler);

        this.insertChar(printValue);
        this.updateKeys();
        this.outputField.focus();
      }
    });

    this.element.addEventListener('contextmenu', (evt) => evt.preventDefault());
  }

  setKeyboardEventListener() {
    document.addEventListener('keydown', () => this.outputField.focus());
    this.element.addEventListener('keydown', (evt) => {
      const prevInputMode = this.currentInpuMode;
      this.currentInpuMode = 'physical';
      if (evt.code !== 'F5') {
        evt.preventDefault();
      }
      const keyCode = evt.code;
      const associatedKeyComponent = this.keyComponents
        .find((keyComponent) => keyComponent.details === keyCode);
      if (!associatedKeyComponent) {
        return;
      }
      const keyElement = associatedKeyComponent.getElement();

      function animationendHandler() {
        keyElement.classList.remove('virtual-keyboard__key--pressed');
        keyElement.parentElement.classList.remove('virtual-keyboard__key--pressed');
        keyElement.removeEventListener('animationend', animationendHandler);
      }
      associatedKeyComponent.getElement().addEventListener('animationend', animationendHandler);

      const serviceKey = ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'ShiftLeft', 'ShiftRight', 'CapsLock'];
      const isServiceKey = serviceKey.some((key) => associatedKeyComponent.details === key);
      let printValue = '';

      if (isServiceKey) {
        if (!evt.repeat) {
          keyElement.classList.add('virtual-keyboard__key--pressed');
          keyElement.parentElement.classList.add('virtual-keyboard__key--pressed');
          printValue = this.getKeyPrintValue(keyElement);
          if (prevInputMode !== this.currentInpuMode) {
            if ((associatedKeyComponent.details === 'ShiftLeft' || associatedKeyComponent.details === 'ShiftRight')) {
              this.shiftKey = !this.shiftKey;
            }
            if (associatedKeyComponent.details === 'ControlLeft' || associatedKeyComponent.details === 'ControlRight') {
              this.ctrlKey = !this.ctrlKey;
            }
            if (associatedKeyComponent.details === 'AltLeft' || associatedKeyComponent.details === 'AltRight') {
              this.altKey = !this.altKey;
            }
          }
        }
      } else if (!evt.repeat) {
        keyElement.classList.add('virtual-keyboard__key--pressed');
        keyElement.parentElement.classList.add('virtual-keyboard__key--pressed');
        printValue = this.getKeyPrintValue(keyElement);
        if (prevInputMode !== this.currentInpuMode) {
          this.shiftKey = false;
          this.altKey = false;
          this.ctrlKey = false;
        }
      } else {
        keyElement.classList.add('virtual-keyboard__key--hold');
        printValue = this.getKeyPrintValue(keyElement);
      }

      this.insertChar(printValue);
      this.updateKeys();
      this.outputField.focus();
    });

    this.element.addEventListener('keyup', (evt) => {
      this.keyComponents.forEach((component) => {
        if (!(component.details === 'CapsLock')) {
          component.getElement().classList.remove('virtual-keyboard__key--hold');
        }

        if (evt.code === 'ShiftLeft' || evt.code === 'ShiftRight') {
          this.shiftKey = false;
        }
        if (evt.code === 'AltLeft' || evt.code === 'AltRight') {
          this.altKey = false;
        }
        if (evt.code === 'ControlLeft' || evt.code === 'ControlRight') {
          this.ctrlKey = false;
        }
      });

      this.updateKeys();
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
      if (this.currentInpuMode === 'virtual') {
        this.ctrlKey = false;
        this.shiftKey = false;
        this.altKey = false;
      }
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

  getKeyPrintValue(keyButton) {
    let printValue = null;
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
      case 'Delete':
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
    return printValue;
  }
}
