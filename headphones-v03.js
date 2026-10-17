'use strict';
(() => {
 const buttons=[...document.querySelectorAll('[data-scene]')];
 const panels=[...document.querySelectorAll('.scene-panel')];
 const isExport=new URLSearchParams(window.location.search).get('export')==='1';
 function choose(key,focus=false){
  if(!buttons.some(button=>button.dataset.scene===key))return;
  buttons.forEach(button=>{const selected=button.dataset.scene===key;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;if(selected&&focus)button.focus();});
  panels.forEach(panel=>{panel.hidden=panel.id!==`scene-${key}`;});
 }
 if(isExport){document.documentElement.classList.add('export');panels.forEach(panel=>{panel.hidden=false;});document.querySelectorAll('.faq-list details').forEach(detail=>{detail.open=true;});document.querySelectorAll('img').forEach(image=>{image.loading='eager';});return;}
 choose('commute');
 buttons.forEach((button,index)=>{
  button.addEventListener('click',()=>choose(button.dataset.scene));
  button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%buttons.length;else if(event.key==='ArrowLeft')target=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=buttons.length-1;if(target===undefined)return;event.preventDefault();choose(buttons[target].dataset.scene,true);});
 });
})();
