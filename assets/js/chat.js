import ChatGPT from './chat-gpt.js';

export default class ChatComponent {
  constructor(container) {
    this.container = container;
    this.element = null;
    this.elementInner = null;
    this.messages = [];
    this.messageElements = [];
    this.bot = [];

    this.init();
  }

  init() {
    const chatElement = document.createElement('div');
    chatElement.className = 'virtual-keyboard__chat chat';
    const chatInner = document.createElement('div');
    chatInner.className = 'chat__inner';
    chatElement.append(chatInner);
    this.elementInner = chatInner;
    this.element = chatElement;
    this.render();

    this.bot = new ChatGPT();
    this.bot
      .send('Write a short greeting and an invitation to help with web development advice.')
      .then((message) => {
        this.pushMessage({ userName: 'ChatGPT', userText: message });
      })
      .catch((error) => this.pushMessage({ userName: 'ChatGPT', userText: error }));

    return this.element;
  }

  render() {
    this.container.prepend(this.element);
  }

  pushMessage(messageObject) {
    if (messageObject.userText.length === 0) {
      return;
    }

    this.messages.push(messageObject);
    const messageElement = this.createMessageElement(messageObject);
    this.elementInner.append(messageElement);

    let index = 0;
    if (messageObject.userName === 'ChatGPT') {
      const text = messageElement.querySelector('.chat__user-text');
      const chars = text.textContent.split('');
      text.textContent = '';
      setTimeout(() => {
        const interval = setInterval(() => {
          text.textContent += chars[index];
          index += 1;
          this.elementInner.scrollTop = this.elementInner.scrollHeight;

          if (index === chars.length) {
            clearInterval(interval);
          }
        }, 5);
      }, 500);
    }

    if (messageObject.userName !== 'ChatGPT') {
      this.bot
        .send(messageObject.userText)
        .then((message) => {
          this.pushMessage({ userName: 'ChatGPT', userText: message });
        })
        .catch((error) => this.pushMessage({ userName: 'ChatGPT', userText: error }));
    }
  }

  createMessageElement(messageObject) {
    const { userName, userText } = messageObject;

    const createElementInner = (tagName, className, content = '') => {
      const element = document.createElement(tagName);
      element.className = className;
      element.textContent = content;
      return element;
    };

    const message = createElementInner('p', 'chat__message');
    const userNameElement = createElementInner('span', 'chat__user-name', `${userName}:`);
    const userTextElement = createElementInner('span', 'chat__user-text', userText);
    message.append(userNameElement, userTextElement);
    this.messageElements.push(message);
    return message;
  }
}
