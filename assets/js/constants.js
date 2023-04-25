const KEYBOARD_KEYS = [
  { value: 'Escape', code: 27, details: 'Escape' },
  {
    value: 'Backspace', code: 8, details: 'Backspace', order: 13,
  },
  {
    value: 'Tab', code: 9, details: 'Tab', order: 14,
  },
  {
    value: 'CapsLock', code: 20, details: 'CapsLock', order: 29,
  },
  {
    value: 'Shift', code: 16, details: 'ShiftLeft', order: 42,
  },
  {
    value: 'Shift', code: 16, details: 'ShiftRight', order: 54,
  },
  {
    value: 'Ctrl', code: 17, details: 'ControlLeft', order: 55,
  },
  {
    value: 'Ctrl', code: 17, details: 'ControlRight', order: 63,
  },
  {
    value: '⊞', code: 91, details: 'MetaLeft', order: 56,
  },
  { value: '⊞', code: 92, details: 'MetaRight' },
  {
    value: 'Alt', code: 18, details: 'AltLeft', order: 57,
  },
  {
    value: 'Alt', code: 18, details: 'AltRight', order: 59,
  },
  {
    value: ' ', code: 32, details: 'Space', order: 58,
  },
  {
    value: 'Enter', code: 13, details: 'Enter', order: 41,
  },
  { value: 'Enter', code: 13, details: 'NumpudEnter' },
  { value: 'ContextMenu', code: 93, details: 'ContextMenu' },
  { value: 'PrintScreen', code: 44, details: 'F13' },
  { value: 'ScrollLock', code: 145, details: 'ScrollLock' },
  { value: 'Pause', code: 19, details: 'Pause' },
  { value: 'Insert', code: 45, details: 'Numpad0' },
  { value: 'Home', code: 36, details: 'Numpad7' },
  { value: 'PageUp', code: 33, details: 'Numpad9' },
  {
    value: 'Delete', code: 46, details: 'NumpadDecimal', order: 28,
  },
  { value: 'End', code: 35, details: 'Numpad1' },
  { value: 'PageDown', code: 34, details: 'Numpad3' },
  { value: 'NumLock', code: 144, details: 'NumLock' },
  {
    value: '←', code: 37, details: 'ArrowLeft', order: 60,
  },
  {
    value: '↑', code: 38, details: 'ArrowUp', order: 53,
  },
  {
    value: '↓', code: 40, details: 'ArrowDown', order: 61,
  },
  {
    value: '→', code: 39, details: 'ArrowRight', order: 62,
  },
  {
    value: ['0', ')'], code: 48, details: 'Digit0', order: 10,
  },
  {
    value: ['1', '!'], code: 49, details: 'Digit1', order: 1,
  },
  {
    value: ['2', '@'], code: 50, details: 'Digit2', order: 2,
  },
  {
    value: ['3', '#'], code: 51, details: 'Digit3', order: 3,
  },
  {
    value: ['4', '$'], code: 52, details: 'Digit4', order: 4,
  },
  {
    value: ['5', '%'], code: 53, details: 'Digit5', order: 5,
  },
  {
    value: ['6', '^'], code: 54, details: 'Digit6', order: 6,
  },
  {
    value: ['7', '&'], code: 55, details: 'Digit7', order: 7,
  },
  {
    value: ['8', '*'], code: 56, details: 'Digit8', order: 8,
  },
  {
    value: ['9', '('], code: 57, details: 'Digit9', order: 9,
  },
  {
    value: ['a', 'A'], code: 65, details: 'KeyA', order: 30,
  },
  {
    value: ['b', 'B'], code: 66, details: 'KeyB', order: 47,
  },
  {
    value: ['c', 'C'], code: 67, details: 'KeyC', order: 45,
  },
  {
    value: ['d', 'D'], code: 68, details: 'KeyD', order: 32,
  },
  {
    value: ['e', 'E'], code: 69, details: 'KeyE', order: 17,
  },
  {
    value: ['f', 'F'], code: 70, details: 'KeyF', order: 33,
  },
  {
    value: ['g', 'G'], code: 71, details: 'KeyG', order: 34,
  },
  {
    value: ['h', 'H'], code: 72, details: 'KeyH', order: 35,
  },
  {
    value: ['i', 'I'], code: 73, details: 'KeyI', order: 22,
  },
  {
    value: ['j', 'J'], code: 74, details: 'KeyJ', order: 36,
  },
  {
    value: ['k', 'K'], code: 75, details: 'KeyK', order: 37,
  },
  {
    value: ['l', 'L'], code: 76, details: 'KeyL', order: 38,
  },
  {
    value: ['m', 'M'], code: 77, details: 'KeyM', order: 49,
  },
  {
    value: ['n', 'N'], code: 78, details: 'KeyN', order: 48,
  },
  {
    value: ['o', 'O'], code: 79, details: 'KeyO', order: 23,
  },
  {
    value: ['p', 'P'], code: 80, details: 'KeyP', order: 24,
  },
  {
    value: ['q', 'Q'], code: 81, details: 'KeyQ', order: 15,
  },
  {
    value: ['r', 'R'], code: 82, details: 'KeyR', order: 18,
  },
  {
    value: ['s', 'S'], code: 83, details: 'KeyS', order: 31,
  },
  {
    value: ['t', 'T'], code: 84, details: 'KeyT', order: 19,
  },
  {
    value: ['u', 'U'], code: 85, details: 'KeyU', order: 21,
  },
  {
    value: ['v', 'V'], code: 86, details: 'KeyV', order: 46,
  },
  {
    value: ['w', 'W'], code: 87, details: 'KeyW', order: 16,
  },
  {
    value: ['x', 'X'], code: 88, details: 'KeyX', order: 44,
  },
  {
    value: ['y', 'Y'], code: 89, details: 'KeyY', order: 20,
  },
  {
    value: ['z', 'Z'], code: 90, details: 'KeyZ', order: 43,
  },
  { value: 'F1', code: 112, details: 'F1' },
  { value: 'F2', code: 113, details: 'F2' },
  { value: 'F3', code: 114, details: 'F3' },
  { value: 'F4', code: 115, details: 'F4' },
  { value: 'F5', code: 116, details: 'F5' },
  { value: 'F6', code: 117, details: 'F6' },
  { value: 'F7', code: 118, details: 'F7' },
  { value: 'F8', code: 119, details: 'F8' },
  { value: 'F9', code: 120, details: 'F9' },
  { value: 'F10', code: 121, details: 'F10' },
  { value: 'F11', code: 122, details: 'F11' },
  { value: 'F12', code: 123, details: 'F12' },
  {
    value: [';', ':'], code: 186, details: 'Semicolon', order: 39,
  },
  {
    value: ['=', '+'], code: 187, details: 'Equal', order: 12,
  },
  {
    value: [',', '<'], code: 188, details: 'Comma', order: 50,
  },
  {
    value: ['-', '_'], code: 189, details: 'Minus', order: 11,
  },
  {
    value: ['.', '>'], code: 190, details: 'Period', order: 51,
  },
  {
    value: ['/', '?'], code: 191, details: 'Slash', order: 52,
  },
  {
    value: ['`', '~'], code: 192, details: 'Backquote', order: 0,
  },
  {
    value: ['[', '{'], code: 219, details: 'BracketLeft', order: 25,
  },
  {
    value: ['\\', '|'], code: 220, details: 'Backslash', order: 27,
  },
  {
    value: [']', '}'], code: 221, details: 'BracketRight', order: 26,
  },
  {
    value: ['\'', '"'], code: 222, details: 'Quote', order: 40,
  },
];

const KEYBOARD_KEYS_LANG_RU = [
  { value: ['"'], code: 50 },
  { value: ['№'], code: 51 },
  { value: [';'], code: 52 },
  { value: [':'], code: 54 },
  { value: ['?'], code: 55 },
  { value: ['ф', 'Ф'], code: 65 },
  { value: ['и', 'И'], code: 66 },
  { value: ['с', 'С'], code: 67 },
  { value: ['в', 'В'], code: 68 },
  { value: ['у', 'У'], code: 69 },
  { value: ['а', 'А'], code: 70 },
  { value: ['п', 'П'], code: 71 },
  { value: ['р', 'Р'], code: 72 },
  { value: ['ш', 'Ш'], code: 73 },
  { value: ['о', 'О'], code: 74 },
  { value: ['л', 'Л'], code: 75 },
  { value: ['д', 'Д'], code: 76 },
  { value: ['ь', 'Ь'], code: 77 },
  { value: ['т', 'Т'], code: 78 },
  { value: ['щ', 'Щ'], code: 79 },
  { value: ['з', 'З'], code: 80 },
  { value: ['й', 'Й'], code: 81 },
  { value: ['к', 'К'], code: 82 },
  { value: ['ы', 'Ы'], code: 83 },
  { value: ['е', 'Е'], code: 84 },
  { value: ['г', 'Г'], code: 85 },
  { value: ['м', 'М'], code: 86 },
  { value: ['ц', 'Ц'], code: 87 },
  { value: ['ч', 'Ч'], code: 88 },
  { value: ['н', 'Н'], code: 89 },
  { value: ['я', 'Я'], code: 90 },
  { value: ['ж', 'Ж'], code: 186 },
  { value: ['б', 'Б'], code: 188 },
  { value: ['ю', 'Ю'], code: 190 },
  { value: ['х', 'Х'], code: 219 },
  { value: ['/'], code: 220 },
  { value: ['ъ', 'Ъ'], code: 221 },
  { value: ['э', 'Э'], code: 222 },
  { value: ['.', ','], code: 191 },
  { value: ['ё', 'Ё'], code: 192 },
];

export { KEYBOARD_KEYS, KEYBOARD_KEYS_LANG_RU };
