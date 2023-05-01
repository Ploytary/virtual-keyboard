export default function createTapEffect(keyButtonElement) {
  const tap = document.createElement('div');
  tap.classList.add('tap-effect');
  tap.style.cssText = `
  position: absolute;
  z-index: 1;
  inset: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1%;
  height: 1%;
  background-color: #75F0F0;
  animation: rize 0.3s ease-out both;
  border-radius: 25%;
  opacity: 0.5;
  `;
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes rize {
    from {
      width: 1%;
      height: 1%;
    }
  
    to {
      width: 250%;
      height: 250%;
      opacity: 0;
    }
  }
  `;
  tap.append(style);
  keyButtonElement.append(tap);

  tap.addEventListener('animationend', () => tap.remove());
}
