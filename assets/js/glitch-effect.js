export default class GlitchEffect {
  constructor(effectedElement, options) {
    const {
      duration,
      shiftStrength = 1,
      scaleStrength = 1,
      iterationCount = 1,
    } = options;

    if (!duration) {
      throw new Error('set effect duration');
    }

    this.duration = duration;
    this.shiftStrength = shiftStrength;
    this.scaleStrength = scaleStrength;
    this.iterationCount = iterationCount;
    this.effectedElement = effectedElement;
    this.animateElement = this.getAnimateElement();
  }

  getAnimateElement() {
    this.animateElement = this.effectedElement.cloneNode(true);

    this.animateElement.onkeydown = null;
    this.animateElement.onkeyup = null;

    this.animateElement.classList.add('glitch-effect');
    this.animateElement.style.position = 'absolute';
    this.animateElement.style.width = '100%';
    this.animateElement.style.top = '0';
    this.animateElement.style.left = '0';

    this.setAnimation();
    this.setListener();

    return this.animateElement;
  }

  setAnimation() {
    let isPositive = false;
    const edges = new Array(3)
      .fill(0)
      .map(() => {
        const randomValue = Math.random();
        if (isPositive) {
          return { value: 0 };
        }
        if (randomValue > 0.8) {
          isPositive = true;
          return { value: 1 };
        }
        return { value: 0 };
      });

    const [edge1, edge2, edge3] = edges;
    const saturation = 50;
    const animationKeyFrame = (
      `
      @keyframes glitch-animation {
        0% {
          -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
          clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
          opacity: 1;
          transform: translateZ(0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        2% {
          -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          transform: translate(-${this.shiftStrength}px) scale(${this.scaleStrength});
          filter: invert(${edge1.value}) hue-rotate(${edge1.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge1.value * saturation + 1});
        }
      
        6% {
          -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          transform: translate(${this.shiftStrength}px) scale(${this.scaleStrength});
          filter: invert(${edge1.value}) hue-rotate(${edge1.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge1.value * saturation + 1});
        }
      
        8% {
          -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          transform: translate(-${this.shiftStrength}px) scale(${this.scaleStrength});
          filter: invert(${edge1.value}) hue-rotate(${edge1.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge1.value * saturation + 1});
        }
      
        9% {
          -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          clip-path: polygon(0 78%, 100% 78%, 100% 90%, 0 90%);
          transform: translate(0);
          filter: invert(${edge1.value}) hue-rotate(${edge1.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge1.value * saturation + 1});
        }

        9.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          transform: translate3d(${this.shiftStrength}px, 0, 0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        10% {
          -webkit-clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
          clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
          transform: translate3d(${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
          filter: invert(${edge2.value}) hue-rotate(${edge2.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge2.value * saturation + 1});
        }
      
        13% {
          -webkit-clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
          clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
          transform: translateZ(0) scale(${this.scaleStrength});
          filter: invert(${edge2.value}) hue-rotate(${edge2.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge2.value * saturation + 1});
        }
      
        13.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          transform: translate3d(${this.shiftStrength}px, 0, 0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        15% {
          -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 48%, 0 48%);
          clip-path: polygon(0 60%, 100% 60%, 100% 48%, 0 48%);
          transform: translate3d(${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
          filter: invert(${edge3.value}) hue-rotate(${edge3.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge3.value * saturation + 1});
        }
      
        20% {
          -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 48%, 0 48%);
          clip-path: polygon(0 60%, 100% 60%, 100% 48%, 0 48%);
          transform: translate3d(-${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
          filter: invert(${edge3.value}) hue-rotate(${edge3.value * 65}deg) brightness(${edge1.value === 0 ? 1 : 0.4}) saturate(${edge3.value * saturation + 1});
        }
      
        20.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          transform: translate3d(${this.shiftStrength}px, 0, 0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        25% {
          -webkit-clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
          clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
          transform: translate3d(${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
        }
      
        30% {
          -webkit-clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
          clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
          transform: translate3d(-${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
        }
      
        30.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        35% {
          -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          transform: translate(-${this.shiftStrength}px) scale(${this.scaleStrength});
        }
      
        40% {
          -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          transform: translate(${this.shiftStrength}px) scale(${this.scaleStrength});
        }
      
        45% {
          -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          transform: translate(-${this.shiftStrength}px) scale(${this.scaleStrength});
        }
      
        50% {
          -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
          transform: translate(0) scale(${this.scaleStrength});
        }

        50.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          opacity: 1
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }

        55% {
          -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          transform: translate3d(-${this.shiftStrength}px, 0, 0);
        }
      
        60% {
          -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          transform: translate3d(${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
        }
      
        65% {
          -webkit-clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          clip-path: polygon(0 30%, 100% 30%, 100% 0, 0 0);
          transform: translate3d(-${this.shiftStrength}px, 0, 0) scale(${this.scaleStrength});
        }
      
        65.1% {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          transform: translate3d(${this.shiftStrength}px, 0, 0);
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      
        to {
          -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          opacity: 1
          filter: invert(0) hue-rotate(0) saturate(1) brightness(1);
        }
      }
      `
    );

    const style = document.createElement('style');
    style.innerHTML = animationKeyFrame;

    this.animateElement.append(style);
    this.animateElement.style.animation = `glitch-animation ${this.duration}s linear ${this.iterationCount} alternate`;
  }

  setListener() {
    this.animateElement.addEventListener('animationend', () => {
      this.animateElement.remove();
      this.animateElement = null;
    });
  }

  render() {
    const { parentElement } = this.effectedElement;
    parentElement.style.position = 'relative';
    parentElement.append(this.animateElement);
  }
}
