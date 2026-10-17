'use strict';
(() => {
  const isExport = new URLSearchParams(window.location.search).get('export') === '1';
  const buttons = [...document.querySelectorAll('[data-color]')];
  const panels = [...document.querySelectorAll('.color-panel')];
  const status = document.getElementById('color-status');
  const names = {taupe:'토프',espresso:'에스프레소'};
  function selectColor(key) {
    if (!Object.hasOwn(names,key)) return;
    buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.color === key)));
    panels.forEach(panel => { panel.hidden = panel.id !== `color-${key}`; });
    status.textContent = `${names[key]} 색상을 보고 있습니다.`;
  }
  if (isExport) {
    document.documentElement.classList.add('export');
    document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    panels.forEach(panel => { panel.hidden = false; });
    document.querySelectorAll('.faq-list details').forEach(detail => { detail.open = true; });
  } else {
    selectColor('taupe');
    buttons.forEach((button,index) => {
      button.addEventListener('click',() => selectColor(button.dataset.color));
      button.addEventListener('keydown',event => {
        let target;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') target = (index+1)%buttons.length;
        else if (event.key === 'Home') target = 0;
        else if (event.key === 'End') target = buttons.length-1;
        if (target === undefined) return;
        event.preventDefault();buttons[target].focus();selectColor(buttons[target].dataset.color);
      });
    });
  }
})();
