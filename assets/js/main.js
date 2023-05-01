import KeyboardComponent from './components/keyboard.js';

let keyboard;

window.onload = () => {
  const lang = localStorage.getItem('currentLang');

  keyboard = new KeyboardComponent(lang);
  keyboard.init();
  keyboard.render(document.body);
};

window.onunload = () => localStorage.setItem('currentLang', keyboard.currentLang);
