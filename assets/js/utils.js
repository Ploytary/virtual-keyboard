export default function createElement(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
}
