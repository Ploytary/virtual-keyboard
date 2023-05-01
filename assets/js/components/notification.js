import createElement from '../utils.js';

export default class NotificationComponent {
  constructor(container, notifications) {
    this.container = container;
    this.element = null;
    this.notificationData = notifications;
    this.notificationElements = null;
    this.iconElement = null;
    this.svgElement = null;
  }

  init() {
    const ICON_RIZE_DURATION = 200;
    const NOTIFICATION_EXTENTION_DURATION = 300;
    const ICON_SPIN_DURATION = 110;
    const COLOR = '#A32929';

    const element = document.createElement('div');
    element.className = 'virtual-keyboard__notification notification';
    this.element = element;

    const notificationItemTemplate = `
  <div class="notification__item">
    <div class="notification__icon-container">
    </div>
    <div class="notification__text-container">
      <div class="notification__progress-bar">
        <div class="notification__progress-bar-value"></div>
      </div>
      <p class="notification__text">Для переключения языка используйте <span class="notification__mark">[ctrl + shift]</span></p>
      <div class="notification__control-panel">
        <button class="notification__skip-button">skip</button>
      </div>
    </div>
  </div>`;

    const svgIconTemplate = `<svg id="warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <circle cx="50" cy="50" r="50" fill="none"/>
    </defs>
    <g id="triangle-1"  transform="translate(50, 50)" opacity="0">
      <g>
        <path d="M-42.4299 24.5L6.86646e-05 -49L42.4401 24.5H-42.4299Z" stroke="${COLOR}" stroke-width="2" fill="transparent">
          <animateTransform begin="0ms" attributeName="transform" type="scale" from="1" to="0.4" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" calcMode="spline" keySplines="1 0 1 0"/>
        </path>
        <animateTransform begin="0ms" attributeName="transform" type="rotate" to="180 0 0" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" fill="freeze" calcMode="spline" keySplines="1 0 1 0"/>
      </g>
      <animate begin="0ms" attributeName="opacity" to="1" dur="${(ICON_RIZE_DURATION / 100) * 75}ms"  repeatCount="1" calcMode="spline" keySplines="1 0 1 0"/>
    </g>
    <g id="triangle-2"  transform="translate(50, 50)" opacity="0">
      <g>
        <path d="M-42.4299 24.5L6.86646e-05 -49L42.4401 24.5H-42.4299Z" stroke="${COLOR}" stroke-width="2" fill="transparent">
          <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 12.5}ms" attributeName="transform" type="scale" from="1" to="0.4" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" calcMode="spline" keySplines="1 0 1 0"/>
        </path>
        <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 12.5}ms" attributeName="transform" type="rotate" to="180 0 0" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" fill="freeze" calcMode="spline" keySplines="1 0 1 0"/>
      </g>
      <animate begin="${(ICON_RIZE_DURATION / 100) * 12.5}ms" attributeName="opacity" to="1" dur="${(ICON_RIZE_DURATION / 100) * 75}ms"  repeatCount="1" calcMode="spline" keySplines="1 0 1 0"/>
    </g>
    <g id="triangle-2"  transform="translate(50, 50)" opacity="0">
      <g>
        <path d="M-42.4299 24.5L6.86646e-05 -49L42.4401 24.5H-42.4299Z" stroke="${COLOR}" stroke-width="2" fill="transparent">
          <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 25}ms" attributeName="transform" type="scale" from="1" to="0.4" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" calcMode="spline" keySplines="1 0 1 0"/>
        </path>
        <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 25}ms" attributeName="transform" type="rotate" to="180 0 0" dur="${(ICON_RIZE_DURATION / 100) * 75}ms" repeatCount="1" additive="sum" fill="freeze" calcMode="spline" keySplines="1 0 1 0"/>
      </g>
      <animate begin="${(ICON_RIZE_DURATION / 100) * 25}ms" attributeName="opacity" to="1" dur="${(ICON_RIZE_DURATION / 100) * 75}ms"  repeatCount="1" calcMode="spline" keySplines="1 0 1 0"/>
    </g>
  
    <g>
      <g id="symbol__border" transform="translate(50, 50)">
        <g>
          <path transform="scale(0)" d="M41.5701 -22L30.6501 -3.09C30.3845 -2.63154 29.9479 -2.29717 29.4361 -2.16031C28.9242 -2.02344 28.379 -2.09526 27.9201 -2.36C27.4611 -2.62474 26.9159 -2.69656 26.4041 -2.55969C25.8922 -2.42283 25.4556 -2.08847 25.1901 -1.63L11.1901 22.63C10.9253 23.0889 10.8535 23.6342 10.9904 24.146C11.1272 24.6578 11.4616 25.0944 11.9201 25.36C12.3785 25.6256 12.7129 26.0622 12.8498 26.574C12.9866 27.0858 12.9148 27.6311 12.6501 28.09L1.73006 47C1.55425 47.3031 1.3019 47.5547 0.998287 47.7295C0.694671 47.9044 0.35044 47.9965 6.10352e-05 47.9965C-0.350318 47.9965 -0.694549 47.9044 -0.998165 47.7295C-1.30178 47.5547 -1.55413 47.3031 -1.72994 47L-12.6499 28.09C-12.9147 27.6311 -12.9865 27.0858 -12.8496 26.574C-12.7128 26.0622 -12.3784 25.6256 -11.9199 25.36C-11.4615 25.0944 -11.1271 24.6578 -10.9902 24.146C-10.8534 23.6342 -10.9252 23.0889 -11.1899 22.63L-25.1899 -1.63C-25.4555 -2.08847 -25.8921 -2.42283 -26.4039 -2.55969C-26.9158 -2.69656 -27.461 -2.62474 -27.9199 -2.36C-28.3789 -2.09526 -28.9241 -2.02344 -29.4359 -2.16031C-29.9478 -2.29717 -30.3844 -2.63154 -30.6499 -3.09L-41.5699 -22C-41.7454 -22.3039 -41.8378 -22.6486 -41.8379 -22.9995C-41.838 -23.3504 -41.7457 -23.6951 -41.5705 -23.9991C-41.3952 -24.3031 -41.143 -24.5556 -40.8392 -24.7313C-40.5355 -24.907 -40.1908 -24.9996 -39.8399 -25H-17.9999C-17.4695 -25 -16.9608 -24.7893 -16.5857 -24.4142C-16.2107 -24.0391 -15.9999 -23.5304 -15.9999 -23C-15.9999 -22.4696 -15.7892 -21.9609 -15.4142 -21.5858C-15.0391 -21.2107 -14.5304 -21 -13.9999 -21H14.0001C14.5305 -21 15.0392 -21.2107 15.4143 -21.5858C15.7893 -21.9609 16.0001 -22.4696 16.0001 -23C16.0001 -23.5304 16.2108 -24.0391 16.5858 -24.4142C16.9609 -24.7893 17.4696 -25 18.0001 -25H39.8401C40.191 -24.9996 40.5356 -24.907 40.8393 -24.7313C41.1431 -24.5556 41.3953 -24.3031 41.5706 -23.9991C41.7459 -23.6951 41.8381 -23.3504 41.838 -22.9995C41.8379 -22.6486 41.7455 -22.3039 41.5701 -22ZM1.73006 34L30.3101 -15.5C30.4855 -15.8039 30.5779 -16.1486 30.578 -16.4995C30.5781 -16.8504 30.4859 -17.1951 30.3106 -17.4991C30.1353 -17.8031 29.8831 -18.0556 29.5793 -18.2313C29.2756 -18.407 28.931 -18.4996 28.5801 -18.5H-28.5799C-28.9308 -18.4996 -29.2755 -18.407 -29.5792 -18.2313C-29.883 -18.0556 -30.1352 -17.8031 -30.3105 -17.4991C-30.4857 -17.1951 -30.578 -16.8504 -30.5779 -16.4995C-30.5778 -16.1486 -30.4854 -15.8039 -30.3099 -15.5L-1.72994 34C-1.55413 34.3031 -1.30178 34.5547 -0.998165 34.7295C-0.694549 34.9044 -0.350318 34.9965 6.10352e-05 34.9965C0.35044 34.9965 0.694671 34.9044 0.998287 34.7295C1.3019 34.5547 1.55425 34.3031 1.73006 34Z" fill="${COLOR}">
            <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 65}ms" attributeName="transform" type="scale" repeatCount="1" to="0.3" dur="${(ICON_RIZE_DURATION / 100) * 35}ms" fill="freeze"/>
          </path>
          <animateTransform begin="${ICON_RIZE_DURATION + NOTIFICATION_EXTENTION_DURATION}ms" attributeName="transform" type="rotate" to="60 0 0" dur="${ICON_SPIN_DURATION}ms" repeatCount="1" additive="sum" fill="freeze" calcMode="spline" keySplines="1 0 1 0"/>
        </g>
      </g>
      <g id="symbol__sign-wrapper" transform="translate(50, 50)">
        <g>
          <path transform="scale(0)" d="M3.5 15.5C3.5 16.1922 3.29473 16.8689 2.91014 17.4445C2.52556 18.0201 1.97894 18.4687 1.33939 18.7336C0.699852 18.9985 -0.00388181 19.0678 -0.682815 18.9327C-1.36175 18.7977 -1.98539 18.4644 -2.47487 17.9749C-2.96436 17.4854 -3.2977 16.8617 -3.43275 16.1828C-3.56779 15.5039 -3.49848 14.8001 -3.23358 14.1606C-2.96867 13.5211 -2.52007 12.9744 -1.9445 12.5899C-1.36892 12.2053 -0.692234 12 2.38419e-07 12C0.928258 12 1.8185 12.3688 2.47487 13.0251C3.13125 13.6815 3.5 14.5717 3.5 15.5ZM2.38419e-07 -14.5C-1.66 -14.5 -3 -14.3 -3 -8.5C-3 -2.7 -2.65 7 -1 7H1C2.65 7 3 -2.71 3 -8.5C3 -14.29 1.66 -14.5 2.38419e-07 -14.5Z" fill="${COLOR}">
            <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 65}ms" attributeName="transform" type="scale" repeatCount="1" to="0.3" dur="${(ICON_RIZE_DURATION / 100) * 35}ms" fill="freeze"/>
          </path>
          <animateTransform begin="${ICON_RIZE_DURATION + NOTIFICATION_EXTENTION_DURATION}ms" attributeName="transform" type="translate" from="0, 0" to="0, -2" repeatCount="1" dur="${ICON_SPIN_DURATION}ms" additive="sum" fill="freeze" calcMode="spline" keySplines="1 0 1 0"/>
        </g>
          <animateTransform begin="${(ICON_RIZE_DURATION / 100) * 65}ms" attributeName="transform" type="translate" from="50, 46" to="50, 50" repeatCount="1" dur="${(ICON_RIZE_DURATION / 100) * 35}ms" fill="freeze"/>
      </g>
    </g>
  </svg>`;
    const svgElement = createElement(svgIconTemplate);
    this.svgElement = svgElement;

    const notificationElements = this.notificationData.map((item) => {
      const notificationElement = createElement(notificationItemTemplate);
      const container = notificationElement.querySelector('.notification__icon-container');
      const textElement = notificationElement.querySelector('.notification__text');
      textElement.innerHTML = item;
      const clone = this.svgElement.cloneNode(true);
      container.append(clone);

      return notificationElement;
    });
    this.notificationElements = notificationElements;
  }

  render() {
    this.container.append(this.element);
    this.showNotifications();
  }

  showNotifications() {
    const START_DELAY = 5;
    const TIME_BETWEEN_NOTIFICATIONS = 5;
    const SHOW_DURATION = 15;

    const notificationElementsClone = this.notificationElements.slice();
    const masterSVG = this.svgElement;

    function showNotification(mainContainer, notificationIndex = 0) {
      let innerIndex = notificationIndex;
      if (notificationElementsClone[notificationIndex] === undefined) {
        if (notificationElementsClone.length === 0) {
          return undefined;
        }
        innerIndex = 0;
      }

      const currentNotification = notificationElementsClone[innerIndex];
      const svg = currentNotification.querySelector('svg');
      const clone = masterSVG.cloneNode(true);
      console.log(clone);
      const parent = currentNotification.querySelector('.notification__icon-container');
      parent.innerHTML = '';
      parent.append(clone);
      svg.remove();

      mainContainer.append(currentNotification);
      innerIndex += 1;

      const durationTimer = setTimeout(() => {
        showNotification(mainContainer, innerIndex);
      }, (TIME_BETWEEN_NOTIFICATIONS + SHOW_DURATION) * 1000);

      const buttonClickHandler = (evt) => {
        const button = evt.target.closest('button');
        if (!button) {
          return undefined;
        }

        currentNotification.remove();
        clearTimeout(durationTimer);
        currentNotification.removeEventListener('click', buttonClickHandler);
        const removeIndex = notificationElementsClone.length === 1 ? 0 : innerIndex - 1;
        notificationElementsClone.splice(removeIndex, 1);
        showNotification(mainContainer, innerIndex - 1);

        return undefined;
      };

      setTimeout(() => {
        currentNotification.remove();
        currentNotification.removeEventListener('click', buttonClickHandler);
      }, SHOW_DURATION * 1000);

      currentNotification.addEventListener('click', buttonClickHandler);

      return innerIndex;
    }

    setTimeout(() => {
      showNotification(this.element);
    }, START_DELAY * 1000);
  }
}
